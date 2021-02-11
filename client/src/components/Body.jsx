import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChartView from './ChartView.jsx';
import TableView from './TableView.jsx';
import DateSearch from './DateSearch.jsx';
import About from './About.jsx';

const { checkTotals, checkOnline } = require('../utilities/APIfunctions.js');

const Body = ( { display } ) => {
  const [data, setData] = useState([]);
  const [currentlyOnline, setCurrentlyOnline] = useState([]);

  useEffect(() => {
    checkOnline(setCurrentlyOnline);
    checkTotals(setData);
  }, [])

  if (display === 'total') return (
    <div>
      <TableView data={data} currentlyOnline={currentlyOnline} checkOnline={() => checkOnline(setCurrentlyOnline)}/>
      <ChartView data={data} checkTotals={() => checkTotals(setData)}/>
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