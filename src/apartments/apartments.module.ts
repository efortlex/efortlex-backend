import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [BookingsModule],
})
export class ApartmentsModule {}
