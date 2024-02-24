import { Module } from '@nestjs/common';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequestsController } from './maintenance-requests.controller';

@Module({
  controllers: [MaintenanceRequestsController],
  providers: [MaintenanceRequestsService],
})
export class MaintenanceRequestsModule {}
