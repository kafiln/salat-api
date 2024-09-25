import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CityService } from './city.service';
import { LocationDto } from './dto/location.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get('closest')
  getClosestCity(@Body() query: LocationDto) {
    const { latitude, longitude } = query;
    const closestCity = this.cityService.findClosestCity(latitude, longitude);
    return closestCity ? closestCity : { message: 'No cities found' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const city = this.cityService.findOne(+id);
    if (!city) {
      throw new NotFoundException(`City with Id ${id} does not exists`);
    }
    return city;
  }
}
