import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestsController } from './maintenance-requests.controller';
import { MaintenanceRequestsService } from './maintenance-requests.service';

describe('MaintenanceRequestsController', () => {
  let controller: MaintenanceRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestsController],
      providers: [MaintenanceRequestsService],
    }).compile();

    controller = module.get<MaintenanceRequestsController>(
      MaintenanceRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
