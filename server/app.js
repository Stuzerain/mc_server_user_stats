const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.use('/', express.static('./client/public'));

app.get('/test', async (req, res) => {
  // axios.get(`https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`)
  //   .then(result => res.json(result.data.players))

  let query = await axios.get(`https://api.mcsrvstat.us/2/${process.env.SERVER_IP}`);
  let players = query.data.players;

  return res.json(players);


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
});

module.exports = app;

// https://api.mcsrvstat.us/2/73.200.234.234:25565