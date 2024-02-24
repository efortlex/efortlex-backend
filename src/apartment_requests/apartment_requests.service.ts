import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateApartmentRequestDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ApartmentRequestsService {
  constructor(private readonly databaseService: DatabaseService) {}

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
      const apartmentBookings =
        await this.databaseService.apartmentRequests.findMany({
          where: { userId },
          skip: offset,
          take: limit,
        });

      const totalItems = await this.databaseService.apartmentBookings.count({
        where: { userId },
      });
      return { totalItems, results: apartmentBookings };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const apartmentBookings =
        await this.databaseService.apartmentRequests.findUnique({
          where: { id, userId },
        });

      return apartmentBookings;
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
