import { Injectable } from '@nestjs/common';
import { CheerioAPI, load } from 'cheerio';

const DAILY_URL = 'https://www.habous.gov.ma/prieres/horaire-api.php?ville=';
const MONTHLY_URL = 'https://habous.gov.ma/prieres/horaire_hijri_2.php?ville=';

const VALUES = [
  'day_name',
  'arabic_month',
  'month',
  'fajr',
  'chorouq',
  'dohr',
  'asr',
  'maghrib',
  'ishae',
];

const parseMonthlyPrayers = (data) => {
  return parseResponse(data, '#horaire > tbody > tr', (items, $) => {
    return items.map((item) => {
      const result = {};
      const children = $(item).children();
      VALUES.forEach((value: string, index) => {
        // skip month
        if (index === 2) return;
        result[value] = children.eq(index).html().trim();
      });
      return result;
    });
  });
};

const parseDailyPrayers = (data) => {
  return parseResponse(data, 'table > tbody > tr > td', (items, $) => {
    const times = items.filter((_, i) => i % 2).map((i) => $(i).text().trim());
    const result: Record<string, string> = {};
    [...VALUES].splice(3).forEach((key, index) => (result[key] = times[index]));
    return result;
  });
};

const parseResponse = (
  data: string,
  path: string,
  parsingFn: (data: any, $: CheerioAPI) => unknown
) => {
  const $ = load(data);
  const items = $(path);
  return parsingFn(Array.from(items), $);
};

@Injectable()
export class PrayersService {
  async getDailyPrayers(id: number) {
    return this.getDataForCity(id, DAILY_URL, parseDailyPrayers);
  }

  async getMontlhyPrayersByCityId(id: number) {
    return this.getDataForCity(id, MONTHLY_URL, parseMonthlyPrayers);
  }

  private getDataForCity = async (
    cityId: number,
    url: string,
    parserFunction: (string) => unknown
  ) => {
    const data = await fetch(`${url}${cityId}`)
      .then((res) => res.text())
      .catch(console.error);
    return parserFunction(data);
  };
}
