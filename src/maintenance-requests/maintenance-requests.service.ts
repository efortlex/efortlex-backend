import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { nanoid } from '../common/nanoid';
import { DatabaseService } from '../database/database.service';
import getKey from '../utils/get-key';
import { CreateMaintenanceRequestDto } from './dto';

@Injectable()
export class MaintenanceRequestsService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(userId: string, args: CreateMaintenanceRequestDto) {
    try {
      await this.databaseService.maintenanceRequests.create({
        data: {
          description: args.description,
          preferredDate: args.preferredDate,
          urgency: args.urgency,
          ticketId: nanoid(6),
          attachments: args.attachments,
          status: 'PENDING',
          userId,
        },
      });

      return { message: 'Maintenance request created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(userId: string, offset: number, limit: number) {
    try {
      const cacheKey = getKey('maintenances', { userId, offset, limit });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const maintenanceRequests =
        await this.databaseService.maintenanceRequests.findMany({
          where: { userId },
          skip: offset,
          take: limit,
        });

      const totalItems = await this.databaseService.maintenanceRequests.count({
        where: { userId },
      });
      const data = { totalItems, results: maintenanceRequests };

      await this.cacheManager.set(cacheKey, data, 3600);

      return data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const cacheKey = getKey('maintenance', { userId, id });

      const cache = await this.cacheManager.get(cacheKey);

      if (cache) return cache;

      const maintenanceRequest =
        await this.databaseService.maintenanceRequests.findUnique({
          where: { id, userId },
        });

      await this.cacheManager.set(cacheKey, maintenanceRequest, 3600);

      return maintenanceRequest;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(userId: string, id: string) {
    try {
      await this.databaseService.maintenanceRequests.delete({
        where: { id, userId },
      });

      return {
        message: `Maintenance Request with id #${id} deleted successfully`,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
