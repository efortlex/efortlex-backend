import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { clean } from '../common/clean';
import { DatabaseService } from '../database/database.service';
import getKey from '../utils/get-key';
import {
  NextofkinDto,
  UpdateDocumentDto,
  UpdateEmploymentDto,
  UpdateNotificationDto,
  UpdateUserDto,
} from './dto';
import { User } from './users.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getOverview(user: User) {
    const userId = user.id;

    const cacheKey = getKey('overview', { userId });

    const cache = await this.cacheManager.get(cacheKey);

    if (cache) return cache;

    const bookedApartment = await this.databaseService.apartmentBookings.count({
      where: { userId, status: 'BOOKED' },
    });
    const scheduledApartment =
      await this.databaseService.apartmentBookings.count({
        where: { userId, status: 'SCHEDULED' },
      });
    const maintainanceRequest =
      await this.databaseService.maintenanceRequests.count({
        where: { userId },
      });

    const apartments = await this.databaseService.apartmentRequests.findMany({
      where: { userId },
    });

    const data = {
      bookedApartment,
      scheduledApartment,
      maintainanceRequest,
      apartmentRequest: {
        found: apartments.filter((apartment) => apartment.status === 'FOUND')
          .length,
        inProgress: apartments.filter(
          (apartment) => apartment.status === 'IN_PROGRESS',
        ).length,
        unavailable: apartments.filter(
          (apartment) => apartment.status === 'UNAVAILABLE',
        ).length,
      },
    };

    await this.cacheManager.set(cacheKey, data, 3600);

    return data;
  }

  async update(user: User, args: UpdateUserDto) {
    try {
      await this.databaseService.user.update({
        where: { email: user.email },
        data: clean(args),
      });

      const cacheKey = getKey('user', { userId: user.id });

      await this.cacheManager.del(cacheKey);

      return { message: 'User updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateEmployment(user: User, args: UpdateEmploymentDto) {
    try {
      const userId = user.id;
      const employment = user.employment;

      if (employment) {
        await this.databaseService.employment.update({
          where: { userId },
          data: clean(args),
        });
      } else {
        await this.databaseService.employment.create({
          data: { userId, ...clean(args) },
        });
      }

      const cacheKey = getKey('user', { userId: user.id });

      await this.cacheManager.del(cacheKey);

      return { message: 'User employment updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateNextOfKin(user: User, args: NextofkinDto) {
    try {
      const userId = user.id;
      const nextOfkin = user.nextofkin;

      if (nextOfkin) {
        await this.databaseService.nextofkin.update({
          where: { userId },
          data: clean(args),
        });
      } else {
        await this.databaseService.nextofkin.create({
          data: { userId, ...clean(args) },
        });
      }

      const cacheKey = getKey('user', { userId: user.id });

      await this.cacheManager.del(cacheKey);
      return { message: 'User Next of kin updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateDocument(user: User, args: UpdateDocumentDto) {
    try {
      const userId = user.id;
      const document = user.document;

      if (document) {
        await this.databaseService.document.update({
          where: { userId },
          data: clean(args),
        });
      } else {
        await this.databaseService.document.create({
          data: { userId, ...clean(args) },
        });
      }

      const cacheKey = getKey('user', { userId: user.id });

      await this.cacheManager.del(cacheKey);

      return { message: 'User document updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateNotification(user: User, args: UpdateNotificationDto) {
    try {
      const userId = user.id;
      const notification = user.notification;

      if (notification) {
        await this.databaseService.notification.update({
          where: { userId },
          data: clean(args),
        });
      } else {
        await this.databaseService.notification.create({
          data: { userId, ...clean(args) },
        });
      }

      const cacheKey = getKey('user', { userId: user.id });

      await this.cacheManager.del(cacheKey);

      return { message: 'User notification updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
