const axios = require('axios');
const { JSDOM } = require('jsdom');
const prayers = require('./data/prayers.json');
const cities = require('./data/cities.json');
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

const setPrayers = prayers => client.set('prayers', JSON.stringify(prayers));
const getPrayers = async () => JSON.parse(await getAsync('prayers'));

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
