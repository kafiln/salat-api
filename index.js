const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes');
const app = express();
const cron = require('node-cron');

// Use CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO: Add swagger support for api
// Routes
app.use('/api', apiRoutes);

// register cron
require('./cron');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
