import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';
import { DailyModule } from './daily/daily.module';
import { MonthlyModule } from './monthly/monthly.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CityModule,
    DailyModule,
    MonthlyModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
