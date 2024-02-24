import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApartmentRequestsService } from './apartment_requests.service';
import { CreateApartmentRequestDto } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OkResponseData } from '../common/ok-response-data';
import {
  ApartmentRequestDto,
  ApartmentRequestsDto,
} from './dto/apartment_requests.dto';
import { AuthGuard } from '../auth/guard';
import { OptionalParseIntPipe } from '../utils';
import { User } from '../users/users.type';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Apartment request')
@ApiHeader({
  name: 'x-access-token',
  required: true,
  example: 'Bearer .....',
})
@Controller('apartment_requests')
export class ApartmentRequestsController {
  constructor(
    private readonly apartmentRequestsService: ApartmentRequestsService,
  ) {}

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartment request created',
      },
    }),
  })
  @Post()
  @UseGuards(AuthGuard)
  create(@CurrentUser() user: User, @Body() args: CreateApartmentRequestDto) {
    return this.apartmentRequestsService.create(user.id, args);
  }

  @ApiOkResponse({ type: ApartmentRequestsDto })
  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
    @CurrentUser() user: User,
  ) {
    return this.apartmentRequestsService.findAll(user.id, offset, limit);
  }

  @ApiOkResponse({ type: ApartmentRequestDto || null })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.apartmentRequestsService.findOne(user.id, id);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartment Request with id #${id} deleted successfully',
      },
    }),
  })
  @Delete(':id')
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.apartmentRequestsService.remove(user.id, id);
  }
}
