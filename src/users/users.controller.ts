import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.type';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserDto } from './dto';
import { AuthGuard } from '../auth/guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  find(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@CurrentUser() user: User, @Body() args: UpdateUserDto) {
    return this.usersService.update(user, args);
  }
}
