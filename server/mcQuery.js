const axios = require('axios');
const pgres = require('../database/index.js');

const checkServerForPlayers = async () => {
  let minecraftQuery = await axios.get(`https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`);
  let players = minecraftQuery.data.players;
}

module.exports = checkServerForPlayers;