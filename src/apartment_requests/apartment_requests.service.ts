import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DatabaseService } from '../database/database.service';
import getKey from '../utils/get-key';
import { CreateApartmentRequestDto } from './dto';

@Injectable()
export class ApartmentRequestsService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(userId: string, args: CreateApartmentRequestDto) {
    try {
      await this.databaseService.apartmentRequests.create({
        data: {
          apartmentType: args.apartmentType,
          budget: args.budget,
          location: args.location,
          status: 'IN_PROGRESS',
          userId,
        },
      });

      return { message: 'Apartment request created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(userId: string, offset: number, limit: number) {
    try {
      const cacheKey = getKey('apartment-requests', { userId, offset, limit });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const apartmentRequests =
        await this.databaseService.apartmentRequests.findMany({
          where: { userId },
          skip: offset,
          take: limit,
        });

      const totalItems = await this.databaseService.apartmentRequests.count({
        where: { userId },
      });

      const data = {
        totalItems,
        results: apartmentRequests,
      };

      await this.cacheManager.set(cacheKey, data, 3600);
      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const cacheKey = getKey('apartment-request', { userId, id });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const apartmentRequests =
        await this.databaseService.apartmentRequests.findUnique({
          where: { id, userId },
        });

      await this.cacheManager.set(cacheKey, apartmentRequests, 3600);
      return apartmentRequests;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(userId: string, id: string) {
    try {
      await this.databaseService.apartmentRequests.delete({
        where: { id, userId },
      });

      return {
        message: `Apartment Request with id #${id} deleted successfully`,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
