import axios from 'axios';

const checkTotals = (updateFn) => {
  axios.get('/api/totals').then((result) => {
    updateFn(result.data);
  });
};

/*** currently deprecated
const checkOnline = (updateFn) => {
  axios.get('/api/online').then((result) => {
    updateFn(result.data.list);
  });
};
*/

// gets playtime on individual days for a player and wrangles the data
const getIndividualStats = (selected, updateFn) => {
  axios.get(`/api/individual/${selected}`).then((result) => {
    let constructedResponse = { dates: [], times: [] };
    result.data.forEach((row) => {
      constructedResponse.dates.push(row.day.substring(0, 10));
      constructedResponse.times.push(row.dailytime);
    });
    constructedResponse.dates.sort();
    return updateFn(constructedResponse);
  });
};

const getRawData = (mainStateFn, onlineStateFn) => {
  axios.get('/api/raw').then((result) => {
    // slight privacy+presentation cleanup
    if (result.data.online) {
      const undesirableProperties = ['ip', 'port', 'hostname', 'icon', 'motd'];
      undesirableProperties.forEach((property) => delete result.data[property]);
      delete result.data.players.uuid;
      onlineStateFn(result.data.players.list);
    } else {
      onlineStateFn(null);
    }
    return mainStateFn(result.data);
  });
};

export { checkTotals, getIndividualStats, getRawData };
