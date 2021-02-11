import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChartView from './ChartView.jsx';
import TableView from './TableView.jsx';
import DateSearch from './DateSearch.jsx';
import About from './About.jsx';



const Body = ( { display } ) => {
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

  if (display === 'total') return (
    <div>
      <TableView data={data} currentlyOnline={currentlyOnline} checkOnline={checkOnline}/>
      <ChartView data={data} checkTotals={checkTotals}/>
    </div>
  )

  if (display === 'individual') return (
    <div>
      <DateSearch data={data}/>
    </div>
  )

  if (display === 'about') return (
    <div>
      <About />
    </div>
  )
}

export default Body;