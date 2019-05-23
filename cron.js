const cron = require('node-cron');
const { retriveAllData, resetdb, savePrayersToDb } = require('./utils');

// schedule tasks to be run on the server

cron.schedule('27 1 * * *', async function() {
  console.log('cron started');
  const start = Date.now();
  resetdb();
  const data = await retriveAllData();
  savePrayersToDb(data);
  const time = (Date.now() - start) / 1000;
  console.log(`done in ${time} seconds`);
  console.log('cron ended');
});
