import { Module } from '@nestjs/common';
import { PrayersService } from './prayers.service';

@Module({
  providers: [PrayersService],
  exports: [PrayersService],
})
export class SharedModule {}
