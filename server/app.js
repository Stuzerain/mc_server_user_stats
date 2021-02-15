const express = require('express');
const app = express();
const axios = require('axios');
const pgres = require('../database/index.js');
const checkServerForPlayers = require('./mcQuery.js');

app.use(express.json());

app.use('/', express.static('./client/public'));

// App requires connection to postgres to function
pgres.connect();

/***  ***/
let runMCQuery = setInterval(() => checkServerForPlayers(), 300000)

app.get('/api/stop', (req, res) => {
  clearInterval(runMCQuery);
  return res.json('stopped')
})

app.get('/api/start', (req, res) => {
  runMCQuery = setInterval(() => checkServerForPlayers(), 300000);
  return res.json('started')
})
/*---------------------------------*/

app.get('/api/totals', async (req, res) => {

  const totalQuery = `SELECT m.name, t.timesum, m.peopleid
    FROM mcpeople m, totaltime t
    WHERE m.peopleid = t.peopleid`

  pgres.query(totalQuery)
    .then(result => {

      res.json(result.rows)
    })
})

app.get('/api/individual/:id', async (req, res) => {
  const { id } = req.params
  const individualQuery = `SELECT m.name, d.dailytime, d.day::date
  FROM mcpeople m, dailytime d
  WHERE (m.peopleid, d.peopleid) = (${id}, ${id})`;

  pgres.query(individualQuery)
    .then(result => res.json(result.rows))

})

app.get('/api/daily/:id/:date', async (req, res) => {
  // NOTE: date should be a string in year-month-day format, i.e. '2021-02-04'
  const { id, date } = req.params

  const dailyQuery = `SELECT p.name, d.dailytime
  FROM mcpeople p, dailytime d, totaltime t
  WHERE (p.peopleid, d.peopleid, t.peopleid, d.day) = (${id}, ${id}, ${id}, '${date}');`

  pgres.query(dailyQuery)
    .then(result => {
      if (result.rows[0]) {
        return res.json(result.rows)
      }
      return res.json([{name: false}])
    })

})

app.get('/api/online', async (req, res) => {
  let query = await axios.get(`https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`);

  if (query.data.online) {
    let players = query.data.players;

    return res.json(players);
  }

  return res.json({
    online: 0,
    serverStatus: 'offline'
  });


    /* EXAMPLE RESPONSE:
    {
      "online": 1,
      "max": 20,
      "list": [
          "<NAME>"
      ],
      "uuid": {
          "<NAME>": "<some nonsense>"
      }
    }
   */
})

module.exports = app;
