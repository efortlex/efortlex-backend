import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '../../auth/guard';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ApartmentBookingDto,
  ApartmentBookingsDto,
} from './dto/apartment-bookings.dto';
import { OkResponseData } from '../../common/ok-response-data';
import { User } from '../../users/users.type';
import { CurrentUser } from '../../auth/current-user.decorator';

@ApiHeader({
  name: 'x-access-token',
  required: true,
  example: 'Bearer .....',
})
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Booking created',
      },
    }),
  })
  @Post(':apartmentId')
  @UseGuards(AuthGuard)
  create(
    @CurrentUser() user: User,
    @Param('apartmentId', ParseUUIDPipe) apartmentId: string,
  ) {
    return this.bookingsService.create(user.id, apartmentId);
  }

  @ApiOkResponse({ type: ApartmentBookingsDto })
  @Get()
  @UseGuards(AuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.bookingsService.findAll(user.id);
  }

  @ApiOkResponse({ type: ApartmentBookingDto || null })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.bookingsService.findOne(user.id, id);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartment Booking with id #${id} deleted successfully',
      },
    }),
  })
  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.bookingsService.remove(user.id, id);
  }
}
