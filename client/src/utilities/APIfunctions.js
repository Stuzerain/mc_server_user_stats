import axios from 'axios';

const checkTotals = (updateFn) => {
  axios.get('/api/totals')
    .then(results => {
      updateFn(results.data);
    })
}

const checkOnline = (updateFn) => {
  axios.get('/api/online')
  .then(results => {
    if (results.data.online > 0) {
      updateFn(results.data.list)
    }
  })
}

const getIndividualStats = (selected, updateFn) => {
  if (selected.length > 0) {
    axios.get(`/api/individual/${selected}`)
    .then(result => {
      let constructedResponse = { dates: [], times: [] }
      result.data.forEach(row => {
        constructedResponse.dates.push(row.day.substring(0, 10));
        constructedResponse.times.push(row.dailytime);
      })
      constructedResponse.dates.sort();
      return updateFn(constructedResponse);
    })
  }
}

export { checkTotals, checkOnline, getIndividualStats }
