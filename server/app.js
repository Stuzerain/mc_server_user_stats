const express = require('express');
const app = express();
const pgres = require('../database/index.js');
const routes = require('./routes');
app.disable('etag').disable('x-powered-by');

// App requires connection to postgres to function
pgres.connect();

app.use(express.json());

app.use('/', express.static('./client/public'));

app.use('/api', routes);

module.exports = app;
