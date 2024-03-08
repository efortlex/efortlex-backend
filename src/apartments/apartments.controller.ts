import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from '../auth/guard';
import { OkResponseData } from '../common/ok-response-data';
import { OptionalParseIntPipe } from '../utils';
import { ApartmentsService } from './apartments.service';
import {
  CreateApartmentDto,
  FindApartmentsByIdsDto,
  UpdateApartmentDto,
} from './dto';
import { ApartmentDto, ApartmentsDto } from './dto/apartment.dto';
import { RoleGuard } from './guard';

@ApiTags('Apartments')
@SkipThrottle()
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'New apartment created',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Request() req, @Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.create(req.user.id, createApartmentDto);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartments created',
      },
    }),
  })
  @ApiBody({
    type: [CreateApartmentDto],
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @Post('many')
  @UseGuards(AuthGuard, RoleGuard)
  createMany(@Request() req, @Body() createApartmentDto: CreateApartmentDto[]) {
    return this.apartmentsService.createMany(req.user.id, createApartmentDto);
  }

  @ApiOkResponse({ type: ApartmentsDto })
  @Get()
  findAll(
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
    @Query('amenities') amenities: string,
    @Query('amenities') type_of_apartment: string,
    @Query('duration_of_rent') duration_of_rent: string,
    @Query('locations') locations: string,
    @Query('price') price: string,
    @Query('bathroom') bathroom: string,
    @Query('bedroom') bedroom: string,
    @Query('installment') installment: string,
  ) {
    return this.apartmentsService.findAll({
      offset,
      limit,
      amenities,
      bathroom,
      bedroom,
      duration_of_rent,
      locations,
      price,
      type_of_apartment,
      installment,
    });
  }

  @ApiOkResponse({ type: ApartmentsDto })
  @Get('similar/:apartmentId')
  findSimilar(
    @Param('apartmentId', ParseUUIDPipe) apartmentId: string,
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
  ) {
    return this.apartmentsService.findSimilar(apartmentId, offset, limit);
  }

  @ApiOkResponse({ type: ApartmentsDto })
  @Get('search/:search')
  findSearch(
    @Param('search') search: string,
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
    @Query('amenities') amenities: string,
    @Query('amenities') type_of_apartment: string,
    @Query('duration_of_rent') duration_of_rent: string,
    @Query('locations') locations: string,
    @Query('price') price: string,
    @Query('bathroom') bathroom: string,
    @Query('bedroom') bedroom: string,
    @Query('installment') installment: string,
  ) {
    return this.apartmentsService.findSearch(search, {
      offset,
      limit,
      amenities,
      bathroom,
      bedroom,
      duration_of_rent,
      locations,
      price,
      type_of_apartment,
      installment,
    });
  }

  @ApiOkResponse({ type: ApartmentsDto })
  @Get('ids')
  findApartmentsByIds(
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
    @Body() args: FindApartmentsByIdsDto,
  ) {
    return this.apartmentsService.findApartmentsByIds({
      ids: args.ids,
      limit,
      offset,
    });
  }

  @ApiOkResponse({ type: ApartmentDto })
  @Get('/by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.apartmentsService.findOneBySlug(slug);
  }

  @ApiOkResponse({ type: ApartmentDto })
  @Get(':apartmentId')
  findOneById(@Param('apartmentId') apartmentId: string) {
    return this.apartmentsService.findOneById(apartmentId);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartment updated successfully',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @Put(':apartmentId')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('apartmentId', ParseUUIDPipe) apartmentId: string,
    updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentsService.update(apartmentId, updateApartmentDto);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Apartment with id #${apartmentId} deleted successfully',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':apartmentId')
  delete(@Param('apartmentId', ParseUUIDPipe) apartmentId: string) {
    return this.apartmentsService.delete(apartmentId);
  }
}
