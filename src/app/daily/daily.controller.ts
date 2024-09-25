import { Controller, Get, Param } from '@nestjs/common';
import { PrayersService } from '../shared/prayers.service';

@Controller('daily')
export class DailyController {
  constructor(private readonly prayerService: PrayersService) {}

  @Get(':id')
  getDailyTimesByCityId(@Param('id') id: string) {
    return this.prayerService.getDailyPrayers(+id);
  }
}
