import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentRequestsController } from './apartment_requests.controller';
import { ApartmentRequestsService } from './apartment_requests.service';

describe('ApartmentRequestsController', () => {
  let controller: ApartmentRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentRequestsController],
      providers: [ApartmentRequestsService],
    }).compile();

    controller = module.get<ApartmentRequestsController>(
      ApartmentRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
