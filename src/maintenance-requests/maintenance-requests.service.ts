import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMaintenanceRequestDto } from './dto';
import { DatabaseService } from '../database/database.service';
import { nanoid } from '../common/nanoid';

@Injectable()
export class MaintenanceRequestsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, args: CreateMaintenanceRequestDto) {
    try {
      await this.databaseService.maintenanceRequests.create({
        data: {
          description: args.description,
          preferredDate: args.preferredDate,
          urgency: args.urgency,
          ticketId: nanoid(6),
          attachment: args.attachment,
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
      const maintenanceRequests =
        await this.databaseService.maintenanceRequests.findMany({
          where: { userId },
          skip: offset,
          take: limit,
        });

      const totalItems = await this.databaseService.maintenanceRequests.count({
        where: { userId },
      });
      return { totalItems, results: maintenanceRequests };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const maintenanceRequest =
        await this.databaseService.maintenanceRequests.findUnique({
          where: { id, userId },
        });

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
