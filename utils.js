const axios = require('axios');
const { JSDOM } = require('jsdom');
const prayers = require('./data/prayers.json');
const cities = require('./data/cities.json');

const fs = require('fs');

const API_URL =
  'http://www.habous.gov.ma/horaire%20de%20priere/horaire-pub.php?ville=';

const getData = async cityId => await axios.get(`${API_URL}${cityId}`);

const parsePrayerTimesFromResponse = response => {
  const dom = new JSDOM(`${response.data}`);
  const tds = dom.window.document.getElementsByTagName('td');

  let j = 0;
  for (let i = 0; i < tds.length; i++) {
    if (i % 2) {
      prayers[j].time = tds[i].textContent.trim();
      j++;
    }
  }
  // Transorm array to object and return it
  return prayers.reduce((acc, { name, time }) => {
    acc[name] = time;
    acc.date = new Date();
    return acc;
  }, {});
};

const retriveAllData = async () => {
  cities.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  let result = [];
  for (let index = 0; index < cities.length; index++) {
    try {
      // console.log(cities[index].name);
      let prayers = parsePrayerTimesFromResponse(
        await getData(cities[index].id)
      );
      prayers.city = cities[index].name;
      prayers.id = cities[index].id;
      result.push(prayers);
    } catch (ex) {
      //TODO: Use a more descriptif error message
      console.error('Someting bad happened for city ' + cities[index].name);
    }
  }
  // console.log(result);
  return result;
};

module.exports.retriveAllData = retriveAllData;

const resetdb = () => {
  const db = initDb();
  db.defaults({ prayers: [] }).write();
  db.get('prayers')
    .remove()
    .write();
};

module.exports.resetdb = resetdb;

const savePrayersToDb = prayers => {
  const db = initDb();
  db.defaults({ prayers: [] }).write();
  prayers.forEach(prayer => {
    db.get('prayers')
      .push(prayer)
      .write();
  });
};

module.exports.savePrayersToDb = savePrayersToDb;

const initDb = () => {
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileSync');

  const adapter = new FileSync('db.json');
  const db = low(adapter);
  return db;
};

// (async () => {
//   const start = Date.now();
//   resetdb();
//   savePrayersToDb(await retriveAllData());
//   const time = (Date.now() - start) / 1000;
//   console.log(`done in ${time} seconds`);
// })();
