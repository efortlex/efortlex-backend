import { Module } from '@nestjs/common';
import { ApartmentRequestsService } from './apartment_requests.service';
import { ApartmentRequestsController } from './apartment_requests.controller';

@Module({
  controllers: [ApartmentRequestsController],
  providers: [ApartmentRequestsService],
})
export class ApartmentRequestsModule {}
