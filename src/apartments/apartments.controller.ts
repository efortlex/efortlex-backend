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
import { ApartmentsService } from './apartments.service';
import {
  CreateApartmentDto,
  FindApartmentsByIdsDto,
  UpdateApartmentDto,
} from './dto';
import { RoleGuard } from './guard';
import { OptionalParseIntPipe } from '../utils';
import { AuthGuard } from '../auth/guard';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Request() req, @Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.create(req.user.id, createApartmentDto);
  }

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

  @Get('similar/:apartmentId')
  findSimilar(
    @Param('apartmentId', ParseUUIDPipe) apartmentId: string,
    @Query('offset', OptionalParseIntPipe) offset: number = 0,
    @Query('limit', OptionalParseIntPipe) limit: number = 10,
  ) {
    return this.apartmentsService.findSimilar(apartmentId, offset, limit);
  }

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

  @Get('/by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.apartmentsService.findOneBySlug(slug);
  }

  @Get(':apartmentId')
  findOneById(@Param('apartmentId') apartmentId: string) {
    return this.apartmentsService.findOneById(apartmentId);
  }

  @Put(':apartmentId')
  @UseGuards(AuthGuard, RoleGuard)
  update(
    @Param('apartmentId', ParseUUIDPipe) apartmentId: string,
    updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentsService.update(apartmentId, updateApartmentDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':apartmentId')
  delete(@Param('apartmentId', ParseUUIDPipe) apartmentId: string) {
    return this.apartmentsService.delete(apartmentId);
  }
}
