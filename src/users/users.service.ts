import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './users.type';
import {
  NextofkinDto,
  UpdateEmploymentDto,
  UpdateNotificationDto,
  UpdateUserDto,
} from './dto';
import { DatabaseService } from '../database/database.service';
import { clean } from '../common/clean';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async update(user: User, args: UpdateUserDto) {
    try {
      await this.databaseService.user.update({
        where: { email: user.email },
        data: clean(args),
      });

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
      return { message: 'User Next of kin updated successfully' };
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

      return { message: 'User notification updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
