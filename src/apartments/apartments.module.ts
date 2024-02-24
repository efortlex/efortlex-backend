import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [],
})
export class ApartmentsModule {}
