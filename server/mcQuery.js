const http = require('http');
const axios = require('axios');
const pgres = require('../database/index.js');

/*** postgres queries ***/
const checkPerson = (name) =>
  `SELECT peopleid FROM mcpeople where name = '${name}'`;

const insertPerson = (name) => `INSERT INTO mcpeople
(name) VALUES
  ('${name}')
RETURNING peopleid`;

const checkTotalTime = (id) =>
  `SELECT totalid FROM totalTime WHERE peopleid = ${id}`;

const updateTotalTime = (id) =>
  `UPDATE totalTime SET timesum = timesum+5 WHERE peopleid=${id}`;

const insertTotalTime = (id) =>
  `INSERT INTO totalTime (peopleid) VALUES (${id})`;

const checkDailyTime = (id) =>
  `SELECT dailyid FROM dailyTime WHERE (peopleid, day) = (${id}, current_date)`;

const updateDailyTime = (id) =>
  `UPDATE dailyTime SET dailytime = dailytime +5 WHERE (peopleid, day) = (${id}, current_date)`;

const insertDailyTime = (id) =>
  `INSERT INTO dailyTime (peopleid) VALUES (${id})`;
/*---------------------------*/

const httpAgent = new http.Agent({ keepAlive: true });
const instance = axios.create({ httpAgent });

const pgUpdate = (name) => {
  let personID;

  // Dealing with people and ensuring uniqueness
  pgres
    .query(checkPerson(name))
    .then((result) => {
      if (result.rows[0]) {
        return result;
      }
      return pgres.query(insertPerson(name));
    })

    // Dealing with totalTime and ensuring uniqueness, incrementing playtime if not
    .then((result) => {
      personID = result.rows[0].peopleid;
      return pgres.query(checkTotalTime(personID));
    })
    .then((result) => {
      if (result.rows[0]) {
        return pgres.query(updateTotalTime(personID));
      }
      return pgres.query(insertTotalTime(personID));
    })

    // Dealing with dailyTime
    .then((result) => pgres.query(checkDailyTime(personID)))
    .then((result) => {
      if (result.rows[0]) {
        return pgres.query(updateDailyTime(personID));
      }
      return pgres.query(insertDailyTime(personID));
    })

    // Dealing with errors
    .catch((err) => console.error(err));
};

/*** Asynchronously update tables ***/
const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const start = async (arr) => {
  await asyncForEach(arr, async (item) => {
    await waitFor(50);
    pgUpdate(item);
  });
};
/*--------------------------*/

const checkServerForPlayers = async () => {
  console.log('checkserverforplayers invoked');
  let minecraftQuery = await axios
    .get(`https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`, { httpAgent })
    .catch((err) => {
      console.error('there was an error');
      return;
    });

  if (minecraftQuery.data.online) {
    let players = minecraftQuery.data.players;
    if (players.list) {
      start(players.list);
      console.log('tables updated');
    }
  } else {
    console.log('server offline');
  }
};

module.exports = checkServerForPlayers;

/*** First attempts at upsert functions for data entry -- may want to revisit for efficiency later ***/
// const upsertTotalTime = (id) => `INSERT INTO totalTime
// (peopleid) VALUES
//   (${id})
// ON CONFLICT (peopleid) DO UPDATE
//   SET timesum = timesum + 5`;

// const upsertDailyTime = (id) => `INSERT INTO DailyTime
// (peopleid) VALUES
//   (${id})
// ON CONFLICT (day) DO UPDATE
//   SET dailyTime = dailyTime + 5
//   WHERE peopleid = ${id}`;
