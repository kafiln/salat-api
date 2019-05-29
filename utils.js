const axios = require('axios');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const prayers = require('./data/prayers');
const cities = require('./data/cities');
const { sleep } = require('./sleep');
const dotenv = require('dotenv');
const { client, getAsync } = require('./redis');
dotenv.config();

const getData = async cityId =>
  await axios.get(`${process.env.API_URL}${cityId}`);

const parseDateFromDom = dom => {
  const dateString = dom
    .querySelector('.hor_par h2:nth-child(2)')
    .textContent.trim()
    .split(' ')
    .pop();
  var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  return new Date(dateString.replace(pattern, '$3/$2/$1'));
};
const parsePrayerTimesFromResponse = response => {
  const dom = new JSDOM(`${response.data}`);
  const tds = dom.window.document.getElementsByTagName('td');
  const date = parseDateFromDom(dom.window.document);
  let j = 0;
  for (let i = 0; i < tds.length; i++) {
    console.log(tds[i].textContent);
    if (i % 2) {
      prayers[j].time = tds[i].textContent.trim();
      j++;
    }
  }
  // Transorm array to object and return it
  return prayers.reduce((acc, { name, time }) => {
    acc[name] = time;
    acc.date = date;
    return acc;
  }, {});
};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const parsePrayersFromResponse = (response, month) => {
  const names = require('./data/prayers');
  const dom = new JSDOM(`${response.data}`);
  const tds = Array.from(dom.window.document.querySelectorAll('#horaire td'))
    .splice(9)
    .map(e => e.textContent.trim());

  let prayers = chunk(tds, 7);

  prayers = prayers.map(p => {
    let prayer = {};
    names.forEach((e, j) => {
      prayer[e.name] = p[j + 1];
    });
    prayer['month'] = month;
    prayer['day'] = parseInt(p[0]);
    return prayer;
  });

  return prayers;
};

const byName = (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0);

const retriveAllData = async () => {
  cities.sort(byName);
  let result = [];
  for (let index = 0; index < cities.length; index++) {
    try {
      console.log(cities[index].name);
      let prayers = parsePrayerTimesFromResponse(
        await getData(cities[index].id)
      );
      prayers.city = cities[index].name;
      prayers.id = cities[index].id;
      result.push(prayers);
    } catch (ex) {
      console.error(`Could not get data for ${cities[index].name}`);
      // console.log(ex);
      console.error(`Retrying after ${process.env.SLEEP_TIME} seconds`);
      // wait 5 seconds and retry;
      sleep(process.env.SLEEP_TIME);
      index = index - 1;
    }
  }
  return result;
};

const set = (name, elements) => client.set(name, JSON.stringify(elements));
const get = async name => JSON.parse(await getAsync(name));
const remove = name => client.set(name, JSON.stringify([]));

const setPrayers = prayers => client.set('prayers', JSON.stringify(prayers));
const setCities = cities => client.set('cities', JSON.stringify(cities));
const setAll = prayers => client.set('all', JSON.stringify(prayers));
const resetAll = () => setAll([]);
const getPrayers = async () => JSON.parse(await getAsync('prayers'));
const getAll = async () => JSON.parse(await getAsync('all'));

const resetdb = () => {
  setPrayers([]);
};

const savePrayersToDb = prayers => {
  setPrayers(prayers);
};

module.exports = {
  retriveAllData,
  savePrayersToDb,
  resetdb,
  getPrayers
};

// (async () => {
//   const start = Date.now();
//   let results = [];
//   for (let cityIndex = 1; cityIndex <= 116; cityIndex++) {
//     city = cities.filter(c => c.id === cityIndex)[0];
//     if (!city) continue;

//     console.log(`Getting data for ${city.names.fr}`);
//     for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
//       try {
//         let data = await getAllDate(cityIndex, monthIndex);
//         let monthPrayer = parsePrayersFromResponse(data, monthIndex);
//         monthPrayer.forEach(m => {
//           m.cityId = city.id;
//           m.city = city.names.fr;
//         });
//         results.push(...monthPrayer);
//       } catch (ex) {
//         console.log(`something bad happened for city ${city.names.fr}`);
//         monthIndex = monthIndex - 1;
//       }
//     }
//     console.log(`done for city ${city.names.fr}`);
//   }

//   fs.writeFileSync('prayers.json', JSON.stringify(results));

//   // resetAll();

//   // const CITIES = 'cities';
//   remove('all');
//   set('all', results);
//   // const data = await get(CITIES);
//   // console.log(data);

//   // fs.writeFileSync('prayers.json', JSON.stringify(data));

//   const time = (Date.now() - start) / 1000;
//   console.log(`done in ${time} seconds`);
// })();
