import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentRequestsService } from './apartment_requests.service';

describe('ApartmentRequestsService', () => {
  let service: ApartmentRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartmentRequestsService],
    }).compile();

    service = module.get<ApartmentRequestsService>(ApartmentRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
