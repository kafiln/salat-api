const { resetdb, retriveAllData, savePrayersToDb, initDb } = require('./utils');
const cities = require('./data/cities.json');

const isDataUpdated = () => {
  const db = initDb();
  const prayers = db.get('prayers').value();
  const today = new Date().getDate();
  return (
    prayers.length == cities.length &&
    prayers.every(p => new Date(p.date).getDate() === today)
  );
};

const updateData = async () => {
  // remove all data
  resetdb();
  // get the data for current data
  const data = await retriveAllData();
  // The save it to local json file
  savePrayersToDb(data);
};

module.exports.doUpdate = async () => {
  if (!isDataUpdated()) updateData();
};
