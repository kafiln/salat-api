import { Test, TestingModule } from '@nestjs/testing';
import { PrayersService } from '../shared/prayers.service';
import { DailyController } from './daily.controller';

describe('DailyController', () => {
  let controller: DailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyController],
      providers: [PrayersService],
    }).compile();

    controller = module.get<DailyController>(DailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
