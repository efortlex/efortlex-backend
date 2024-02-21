import { Injectable } from '@nestjs/common';
import { User } from './users.type';
import { UpdateUserDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async update(user: User, args: UpdateUserDto) {
    await this.databaseService.user.update({
      where: { email: user.email },
      data: {
        ...args,
        nextofkin: { update: args.nextofkin },
        employment: { update: args.employment },
      },
    });

    return { message: 'User updated successfully' };
  }
}
