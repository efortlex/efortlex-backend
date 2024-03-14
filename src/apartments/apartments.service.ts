import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { clean } from '../common/clean';
import slugify from '../common/slugify';
import { DatabaseService } from '../database/database.service';
import {
  ApartmentPricing,
  CreateApartmentDto,
  UpdateApartmentDto,
} from './dto';

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
      const pricing = {
        rent: args.rent,
        serviceCharge: args.rent * 0.1,
        cautionFee: args.rent * 0.2,
        agreementFee: args.rent * 0.05,
      };
      await this.databaseService.apartments.create({
        data: {
          name: args.name,
          userId,
          images: args.images,
          slug: slugify(args.name),
          numberOfBathroom: 1,
          // numberOfBathroom: args.numberOfBathroom,
          apartmentType: args.apartmentType,
          description: args.description,
          numberOfBedroom: 0,
          durationOfRent: [args.durationOfRent],
          amenities: args.amenities,
          pricing: {
            create: {
              ...pricing,
              total: this.calculateTotalPrice(pricing),
            },
          },
          location: {
            create: {
              address: args.address,
              city: args.city,
              country: args.country,
              state: args.state,
              postalCode: args.postalCode,
            },
          },
          bookingOptions: { create: args.bookingOptions },
          houseRule: args.houseRule,
          tags: args.tags,
          avaliableUnits: args.avaliableUnits,
          totalUnit: args.totalUnit,
          policies: args.policies,
          otherAmenities: args.otherAmenities,
        },
        include: {
          bookingOptions: true,
          pricing: true,
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
      return { message: 'Apartments created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(args: FindAllArgs) {
    const { offset, limit, ...rest } = args;

    const where = this.formatFilter(rest);

    const apartments = await this.databaseService.apartments.findMany({
      where:
        where.OR.length > 0
          ? where
          : {
              archived: false,
            },
      include: {
        bookingOptions: true,
        pricing: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({
      where: where.OR.length > 0 ? where : { archived: false },
    });

    const data = {
      totalItems,
      results: apartments,
    };

    return data;
  }

  async findAllProperties(args: FindAllArgs & { userId: string }) {
    const { offset, limit, ...rest } = args;

    const where = this.formatFilter(rest);

    const apartments = await this.databaseService.apartments.findMany({
      where:
        where.OR.length > 0
          ? where
          : {
              archived: false,
            },
      include: {
        bookingOptions: true,
        pricing: true,
        location: true,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await this.databaseService.apartments.count({
      where: where.OR.length > 0 ? where : { archived: false },
    });

    const data = {
      totalItems,
      results: apartments,
    };

    return data;
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
      otherAmenities,
    } = providedApartment;

    const where = {
      OR: [
        // Similar location
        {
          OR: [
            { location: { address: { contains: location.address } } },
            { location: { city: { contains: location.city } } },
            { location: { country: { contains: location.country } } },
            { location: { state: { contains: location.state } } },
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
          amenities: { hasSome: amenities },
        },
        // OR condition for similar otherAmenities
        {
          otherAmenities: { hasSome: otherAmenities },
        },
        // OR condition for similar house rules
        {
          houseRule: { hasSome: houseRule },
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
        archived: true,
      },
    };

    const similarApartments = await this.databaseService.apartments.findMany({
      where,
      include: {
        bookingOptions: true,
        pricing: true,
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
      NOT: {
        archived: true,
      },
    };
    const apartments = await this.databaseService.apartments.findMany({
      where,
      include: {
        bookingOptions: true,
        pricing: true,
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
        bookingOptions: true,
        pricing: true,
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
        bookingOptions: true,
        pricing: true,
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
        bookingOptions: true,
        pricing: true,
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

  private formatFilter(
    args: Omit<FindAllArgs & { userId?: string }, 'limit' | 'offset'>,
  ) {
    const {
      locations,
      bathroom,
      bedroom,
      type_of_apartment,
      duration_of_rent,
      price,
      installment,
      userId,
    } = args;
    // TODO: Need to work on amentities
    const OR: Prisma.ApartmentsWhereInput[] = [];

    if (locations) {
      const location = locations.split(',');
      OR.push({
        OR: [
          { location: { address: { in: location } } },
          { location: { city: { in: location } } },
          { location: { country: { in: location } } },
          { location: { state: { in: location } } },
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
    return clean({ OR, AND: userId ? { userId } : null });
  }
}
