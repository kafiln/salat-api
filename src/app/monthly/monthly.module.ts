import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MonthlyController } from './monthly.controller';

@Module({
  imports: [SharedModule],
  controllers: [MonthlyController],
})
export class MonthlyModule {}
