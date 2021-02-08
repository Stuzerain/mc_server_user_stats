import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChartView from './ChartView.jsx';
import TableView from './TableView.jsx';
import DateSearch from './DateSearch.jsx';



const App = () => {
  const [data, setData] = useState([]);
  const [currentlyOnline, setCurrentlyOnline] = useState([]);

  const checkTotals = () => {
    axios.get('/api/totals')
      .then(results => {
        setData(results.data);
      })
  }

  const checkOnline = () => {
    axios.get('/api/online')
    .then(results => {
      if (results.data.online > 0) {
        setCurrentlyOnline(results.data.list)
      }
    })
  }

  useEffect(() => {
    checkOnline();
    checkTotals();
  }, [])

  return (
    <div>
      <TableView data={data} currentlyOnline={currentlyOnline} checkOnline={checkOnline}/>
      <ChartView data={data} checkTotals={checkTotals}/>
      <DateSearch data={data}/>
    </div>
  )
}

export default App;