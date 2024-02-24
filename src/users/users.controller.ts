import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.type';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserDto } from './dto';
import { AuthGuard } from '../auth/guard';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { OkResponseData } from '../common/ok-response-data';

@ApiHeader({
  name: 'x-access-token',
  required: true,
  example: 'Bearer .....',
})
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @UseGuards(AuthGuard)
  @Get()
  find(@CurrentUser() user: User) {
    return user;
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'User updated successfully',
      },
    }),
  })
  @UseGuards(AuthGuard)
  @Put()
  update(@CurrentUser() user: User, @Body() args: UpdateUserDto) {
    return this.usersService.update(user, args);
  }
}
