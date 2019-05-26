const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const { initDb } = require('./update');
const { client } = require('./redis');

client.on('connect', async () => {
  console.log('connected to redis');
  await initDb();
});

app.use(cors());
//TODO: Add swagger doc
// Routes
app.use('', routes);

// register cron
require('./cron');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
