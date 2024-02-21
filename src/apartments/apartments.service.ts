import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApartmentPricing,
  CreateApartmentDto,
  UpdateApartmentDto,
} from './dto';
import slugify from '../common/slugify';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

type FindAllArgs = {
  offset: number;
  limit: number;
  type_of_apartment: string;
  amenities: string;
  duration_of_rent: string;
  price: string;
  bathroom: string;
  bedroom: string;
  locations: string;
  installment: string;
};

type TypeOfApartment =
  | 'ONE_BEDROOM'
  | 'SELF_CONTAINED'
  | 'TWO_BEDROOM_OR_MORE'
  | 'DUPLEX'
  | 'BUNGALOW'
  | 'MINI_FLAT'
  | 'PENTHOUSE';

type DurationOfRent =
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'QUATERLY'
  | 'SIX_MONTHS'
  | 'ANNUALLY';

type FindApartmentsByIdsArgs = {
  ids: string[];
  offset: number;
  limit: number;
};

@Injectable()
export class ApartmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, args: CreateApartmentDto) {
    try {
      await this.databaseService.apartments.create({
        data: {
          name: args.name,
          userId: userId,
          images: args.images,
          slug: slugify(args.name),
          numberOfBathroom: args.numberOfBathroom,
          apartmentType: args.apartmentType,
          description: args.description,
          numberOfBedroom: args.numberOfBedroom,
          durationOfRent: args.durationOfRent,
          amenities: { create: args.amenities },
          pricing: {
            create: {
              ...args.pricing,
              total: this.calculateTotalPrice(args.pricing),
            },
          },
          location: { create: args.location },
          bookingOptions: { create: args.bookingOptions },
          houseRule: { create: args.houseRule },
          tags: args.tags,
        },
        include: {
          amenities: true,
          bookingOptions: true,
          pricing: true,
          houseRule: true,
          location: true,
        },
      });
      return { message: 'New apartment created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMany(userId: string, args: CreateApartmentDto[]) {
    try {
      for (let i = 0; i < args.length; i++) {
        await this.create(userId, args[i]);
      }
      return { message: 'New apartments created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(args: FindAllArgs) {
    const { offset, limit, ...rest } = args;

    const where = this.formatFilter(rest);

    const apartments = await this.databaseService.apartments.findMany({
      where: where.OR.length > 0 ? where : {},
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({
      where: where.OR.length > 0 ? where : {},
    });

    return { totalItems, results: apartments };
  }

  async findSimilar(apartmentId: string, offset: number, limit: number) {
    const providedApartment = await this.findOneById(apartmentId);

    if (!providedApartment) throw new NotFoundException('Apartment not found');

    const {
      location,
      numberOfBedroom,
      numberOfBathroom,
      amenities,
      houseRule,
      apartmentType,
      durationOfRent,
      rating,
      tags,
    } = providedApartment;

    const where = {
      OR: [
        // Similar location
        {
          OR: [
            { location: { precised: { contains: location.precised } } },
            { location: { approximate: { contains: location.approximate } } },
          ],
        },
        // Similar number of bedrooms
        {
          numberOfBedroom: numberOfBedroom,
        },
        // Similar number of bathrooms
        {
          numberOfBathroom: numberOfBathroom,
        },
        // OR condition for similar amenities
        {
          OR: [
            { amenities: { acUnit: amenities.acUnit } },
            { amenities: { bathtub: amenities.bathtub } },
            { amenities: { doorBell: amenities.doorBell } },
            { amenities: { cctvCamera: amenities.cctvCamera } },
            { amenities: { fireSmokeDetector: amenities.fireSmokeDetector } },
            { amenities: { laundry: amenities.laundry } },
            { amenities: { outdoorGrill: amenities.outdoorGrill } },
            { amenities: { sittingBar: amenities.sittingBar } },
            { amenities: { waterHeater: amenities.waterHeater } },
            { amenities: { others: { hasSome: amenities.others } } },
          ],
        },
        // OR condition for similar house rules
        {
          OR: [
            { houseRule: { smoking: houseRule.smoking } },
            { houseRule: { illegalActivities: houseRule.illegalActivities } },
            { houseRule: { gateClose: houseRule.gateClose } },
            { houseRule: { inflammables: houseRule.inflammables } },
            { houseRule: { keyLost: houseRule.keyLost } },
            { houseRule: { landlordPermission: houseRule.landlordPermission } },
            { houseRule: { loudMusic: houseRule.loudMusic } },
            { houseRule: { nightParties: houseRule.nightParties } },
          ],
        },
        // Similar apartment type
        {
          apartmentType: apartmentType,
        },
        // Similar duration of rent
        {
          durationOfRent: { hasSome: durationOfRent },
        },
        // Similar rating
        {
          rating: rating,
        },
        // Similar tags
        {
          tags: { hasSome: tags },
        },
      ],
      // Exclude the provided apartment from the results
      NOT: {
        id: apartmentId,
      },
    };

    const similarApartments = await this.databaseService.apartments.findMany({
      where,
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({ where });

    return { totalItems, results: similarApartments };
  }

  async findSearch(search: string, args: FindAllArgs) {
    const { offset, limit, ...rest } = args;

    const format = this.formatFilter(rest);
    const where: Prisma.ApartmentsWhereInput = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        ...format.OR,
      ],
    };
    const apartments = await this.databaseService.apartments.findMany({
      where,
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({ where });

    return { search, totalItems, results: apartments };
  }

  async findOneById(apartmentId: string) {
    const apartment = await this.databaseService.apartments.findUnique({
      where: {
        id: apartmentId,
      },
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
    });

    return apartment;
  }

  async findOneBySlug(slug: string) {
    const apartment = await this.databaseService.apartments.findUnique({
      where: {
        slug,
      },
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
    });

    return apartment;
  }

  async findApartmentsByIds({ ids, limit, offset }: FindApartmentsByIdsArgs) {
    const where = { id: { in: ids } };
    const apartments = await this.databaseService.apartments.findMany({
      where,
      include: {
        amenities: true,
        bookingOptions: true,
        pricing: true,
        houseRule: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({
      where,
    });

    return { totalItems, results: apartments };
  }

  async update(apartmentId: string, args: UpdateApartmentDto) {
    await this.databaseService.apartments.update({
      where: { id: apartmentId },
      data: {
        ...args,
        location: { update: args.location },
        pricing: { update: args.pricing },
        bookingOptions: { update: args.bookingOptions },
        amenities: { update: args.amenities },
        houseRule: { update: args.houseRule },
      },
    });
    return { message: 'Apartment updated successfully' };
  }

  async delete(apartmentId: string) {
    try {
      await this.databaseService.apartments.delete({
        where: { id: apartmentId },
      });

      return {
        message: `Apartment with id #${apartmentId} deleted successfully`,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private calculateTotalPrice(args: ApartmentPricing) {
    const { agreementFee, cautionFee, rent, serviceCharge } = args;

    return agreementFee + cautionFee + rent + serviceCharge;
  }

  private formatFilter(args: Omit<FindAllArgs, 'limit' | 'offset'>) {
    const {
      locations,
      bathroom,
      bedroom,
      type_of_apartment,
      duration_of_rent,
      price,
      installment,
    } = args;
    // TODO: Need to work on amentities
    const OR: Prisma.ApartmentsWhereInput[] = [];

    if (locations) {
      const location = locations.split(',');
      OR.push({
        OR: [
          { location: { precised: { in: location } } },
          { location: { approximate: { in: location } } },
        ],
      });
    }

    if (bathroom) {
      OR.push({
        numberOfBathroom:
          bathroom === '4+' ? { gte: 4 } : { equals: Number(bathroom) },
      });
    }

    if (bedroom) {
      OR.push({
        numberOfBedroom:
          bedroom === '4+' ? { gte: 4 } : { equals: Number(bedroom) },
      });
    }

    if (type_of_apartment) {
      const typeOfApartment = type_of_apartment
        .toUpperCase()
        .replaceAll(' ', '_')
        .replace('two', '2') as TypeOfApartment;
      if (
        [
          'ONE_BEDROOM',
          'SELF_CONTAINED',
          'TWO_BEDROOM_OR_MORE',
          'DUPLEX',
          'BUNGALOW',
          'MINI_FLAT',
          'PENTHOUSE',
        ].includes(typeOfApartment)
      ) {
        OR.push({
          apartmentType: typeOfApartment,
        });
      }
    }

    if (duration_of_rent) {
      const durationOfRent = duration_of_rent
        .split(',')
        .map((duration) =>
          duration.toUpperCase().replaceAll(' ', '_'),
        ) as DurationOfRent[];

      const set2 = new Set([
        'DAILY',
        'WEEKLY',
        'MONTHLY',
        'QUATERLY',
        'SIX_MONTHS',
        'ANNUALLY',
      ]);

      if (durationOfRent.every((str) => set2.has(str))) {
        OR.push({
          durationOfRent: { hasSome: durationOfRent },
        });
      }
    }

    if (price) {
      const priceRange = price.split('-').map((value) => Number(value)) as [
        number,
        number,
      ];

      OR.push({
        pricing: {
          total: {
            gte: priceRange[0],
            lte: priceRange[1],
          },
        },
      });
    }

    if (installment) {
      OR.push({
        bookingOptions: {
          OR: [{ installment: installment === 'true' ? true : false }],
        },
      });
    }
    return { OR };
  }
}
