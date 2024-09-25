import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrayersService } from '../shared/prayers.service';

@ApiTags('Monthly')
@Controller('monthly')
export class MonthlyController {
  constructor(private readonly prayerService: PrayersService) {}

  @Get(':id')
  getMontlhyTimesByCityId(@Param('id') id: string) {
    return this.prayerService.getMontlhyPrayersByCityId(+id);
  }
}
