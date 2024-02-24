import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, apartmentId: string) {
    try {
      await this.databaseService.apartmentBookings.create({
        data: {
          apartmentId,
          status: 'PENDING',
          userId,
        },
      });

      return { message: 'Booking created' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(userId: string) {
    try {
      const apartmentBookings =
        await this.databaseService.apartmentBookings.findMany({
          where: { userId },
          include: {
            apartment: true,
            user: true,
          },
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
        await this.databaseService.apartmentBookings.findUnique({
          where: { id, userId },
          include: {
            apartment: true,
            user: true,
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
