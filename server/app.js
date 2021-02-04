const express = require('express');
const app = express();

app.use(express.json());

app.use('/', express.static('./client/public'));

app.get('/test', (req, res) => {
  return res.json('test successful')
});

module.exports = app;