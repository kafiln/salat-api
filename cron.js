const cron = require('node-cron');
const { doUpdate } = require('./update');

doUpdate();

// schedule tasks to be run on the server
cron.schedule('0 0 * * *', async function() {
  console.log('cron started');
  const start = Date.now();
  await doUpdate();
  const time = (Date.now() - start) / 1000;
  console.log(`done in ${time} seconds`);
  console.log('cron ended');
});
