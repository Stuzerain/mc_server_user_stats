const api = require('express').Router();
const pgres = require('../../database/index.js');
const axios = require('axios');
const checkServerForPlayers = require('../mcQuery.js');

/*** Manual starting and stopping of server queries, not for normal use ***/
let runMCQuery = setInterval(() => checkServerForPlayers(), 300000);

api.get('/stop', (req, res) => {
  clearInterval(runMCQuery);
  return res.json('stopped');
});

api.get('/start', (req, res) => {
  runMCQuery = setInterval(() => checkServerForPlayers(), 300000);
  return res.json('started');
});
/*---------------------------------*/

api.get('/totals', (req, res) => {
  const totalQuery = `SELECT m.name, t.timesum, m.peopleid
    FROM mcpeople m, totaltime t
    WHERE m.peopleid = t.peopleid`;

  pgres.query(totalQuery).then((result) => {
    res.json(result.rows);
  });
});

api.get('/individual/:id', async (req, res) => {
  const { id } = req.params;
  const individualQuery = `SELECT m.name, d.dailytime, d.day::date
  FROM mcpeople m, dailytime d
  WHERE (m.peopleid, d.peopleid) = (${id}, ${id})`;

  pgres.query(individualQuery).then((result) => res.json(result.rows));
});

api.get('/daily/:id/:date', async (req, res) => {
  // NOTE: date should be a string in year-month-day format, i.e. '2021-02-04'
  const { id, date } = req.params;

  const dailyQuery = `SELECT p.name, d.dailytime
  FROM mcpeople p, dailytime d, totaltime t
  WHERE (p.peopleid, d.peopleid, t.peopleid, d.day) = (${id}, ${id}, ${id}, '${date}');`;

  pgres.query(dailyQuery).then((result) => {
    if (result.rows[0]) {
      return res.json(result.rows);
    }
    return res.json([{ name: false }]);
  });
});

api.get('/online', async (req, res) => {
  let query = await axios.get(
    `https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`
  );

  if (query.data.online) {
    let players = query.data.players;
    return res.json(players);
  }

  return res.json({
    online: 0,
    serverStatus: 'offline',
  });
});

api.get('/raw', async (req, res) => {
  let query = await axios.get(
    `https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`
  );

  return res.json(query.data);
});

module.exports = api;
