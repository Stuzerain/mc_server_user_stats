const { Client } = require('pg');
const dotenv = require('dotenv')
const credentials = dotenv.config().parsed;

const client = new Client({
  host: credentials.DB_HOST,
  user: credentials.DB_USER,
  password: credentials.DB_PASS
});

module.exports = client;