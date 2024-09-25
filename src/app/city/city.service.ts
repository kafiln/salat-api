import { Injectable } from '@nestjs/common';
import { findNearest } from 'geolib';

import data from './cities.json';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  findAll(): City[] {
    return data;
  }

  findOne(id: number): City | undefined {
    return data.find((item) => item.id === id);
  }

  findClosestCity(latitude: number, longitude: number) {
    return findNearest({ latitude, longitude }, data);
  }
}
