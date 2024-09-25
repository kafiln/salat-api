import { Test, TestingModule } from '@nestjs/testing';
import { PrayersService } from '../shared/prayers.service';
import { MonthlyController } from './monthly.controller';

describe('MonthlyController', () => {
  let controller: MonthlyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyController],
      providers: [PrayersService],
    }).compile();

    controller = module.get<MonthlyController>(MonthlyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
