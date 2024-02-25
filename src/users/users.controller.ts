import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.type';
import { CurrentUser } from '../auth/current-user.decorator';
import {
  NextofkinDto,
  UpdateEmploymentDto,
  UpdateNotificationDto,
  UpdateUserDto,
} from './dto';
import { AuthGuard } from '../auth/guard';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { OkResponseData } from '../common/ok-response-data';

@ApiHeader({
  name: 'x-access-token',
  required: true,
  example: 'Bearer .....',
})
@ApiTags('Users')
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

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'User employment updated successfully',
      },
    }),
  })
  @UseGuards(AuthGuard)
  @Put('/update-employment')
  updateEmployment(
    @CurrentUser() user: User,
    @Body() args: UpdateEmploymentDto,
  ) {
    return this.usersService.updateEmployment(user, args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'User Next of kin updated successfully',
      },
    }),
  })
  @UseGuards(AuthGuard)
  @Put('/update-next-of-kin')
  updateNextOfKin(@CurrentUser() user: User, @Body() args: NextofkinDto) {
    return this.usersService.updateNextOfKin(user, args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'User notification updated successfully',
      },
    }),
  })
  @UseGuards(AuthGuard)
  @Put('/update-notification')
  updateNotification(
    @CurrentUser() user: User,
    @Body() args: UpdateNotificationDto,
  ) {
    return this.usersService.updateNotification(user, args);
  }
}
