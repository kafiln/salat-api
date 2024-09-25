import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DailyController } from './daily.controller';

@Module({
  imports: [SharedModule],
  controllers: [DailyController],
})
export class DailyModule {}
