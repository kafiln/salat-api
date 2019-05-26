const cron = require('node-cron');
const { initDb } = require('./update');

// schedule tasks to be run on the server
cron.schedule('* * * * *', async function() {
  console.log('cron started');
  const start = Date.now();
  await initDb();
  const time = (Date.now() - start) / 1000;
  console.log(`done in ${time} seconds`);
  console.log('cron ended');
});
