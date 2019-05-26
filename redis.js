const dotenv = require('dotenv');
dotenv.config();
const { promisify } = require('util');

const client = require('redis').createClient(process.env.REDIS_URL, {
  auth_pass: process.env.REDIS_PASSWORD
});

module.exports.client = client;
module.exports.getAsync = promisify(client.get).bind(client);
