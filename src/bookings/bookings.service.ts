import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DatabaseService } from '../database/database.service';
import getKey from '../utils/get-key';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(userId: string, args: CreateBookingDto) {
    try {
      await this.databaseService.apartmentBookings.create({
        data: {
          apartmentId: args.apartmentId,
          status: args.isScheduled ? 'SCHEDULED' : 'PENDING',
          inspectionDate: args.inspectionDate,
          userId,
        },
      });

      return { message: 'Booking created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(userId: string, offset: number, limit: number) {
    try {
      const cacheKey = getKey('bookings', { userId, offset, limit });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const apartmentBookings =
        await this.databaseService.apartmentBookings.findMany({
          where: { userId },
          include: {
            apartment: {
              include: {
                pricing: true,
              },
            },
          },
          skip: offset,
          take: limit,
        });

      const totalItems = await this.databaseService.apartmentBookings.count({
        where: { userId },
      });

      const data = { totalItems, results: apartmentBookings };

      await this.cacheManager.set(cacheKey, data, 3600);

      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const cacheKey = getKey('booking', { id, userId });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const apartmentBookings =
        await this.databaseService.apartmentBookings.findUnique({
          where: { id, userId },
          include: {
            apartment: {
              include: {
                pricing: true,
              },
            },
          },
        });

      return apartmentBookings;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(userId: string, id: string) {
    try {
      await this.databaseService.apartmentBookings.delete({
        where: { id, userId },
      });

      return {
        message: `Apartment Booking with id #${id} deleted successfully`,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
