import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestsService } from './maintenance-requests.service';

describe('MaintenanceRequestsService', () => {
  let service: MaintenanceRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceRequestsService],
    }).compile();

    service = module.get<MaintenanceRequestsService>(
      MaintenanceRequestsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
