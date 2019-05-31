const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { langMiddlewear } = require('./middlewear');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(_ => console.log('Could not connect to MongoDB', _));

app.use(cors());
// Routes
app.use('', langMiddlewear, routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
