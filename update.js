const {
  resetdb,
  retriveAllData,
  savePrayersToDb,
  getPrayers
} = require('./utils');
const cities = require('./data/cities.json');

const isDataUpdated = async () => {
  const prayers = await getPrayers();
  const today = new Date().getDate();
  return (
    prayers.length == cities.length &&
    prayers.every(p => new Date(p.date).getDate() === today)
  );
};

const updateData = async () => {
  // start a timer
  const start = Date.now();
  // remove all data
  resetdb();
  // get the data for current data
  const data = await retriveAllData();
  // The save it to local json file
  savePrayersToDb(data);
  // end the timer and display execution
  const time = (Date.now() - start) / 1000;
  console.log(`done in ${time} seconds`);
};

module.exports.initDb = async () => {
  if (await isDataUpdated()) {
    console.log(
      `The data for the day ${new Date().toLocaleDateString()} is already up to date`
    );
    return;
  }
  await updateData();
};
