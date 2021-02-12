import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import ChartView from './ChartView.jsx';
import TableView from './TableView.jsx';
import DateSearch from './DateSearch.jsx';
import About from './About.jsx';

const { checkTotals, checkOnline } = require('../utilities/APIfunctions.js');

const BodyWrapper = styled.div`
  background-image: url(dirt.jpg);
  height: 100vh;
  padding: 2%;
`;

const Body = ( { display } ) => {
  const [data, setData] = useState([]);
  const [currentlyOnline, setCurrentlyOnline] = useState([]);

  useEffect(() => {
    checkOnline(setCurrentlyOnline);
    checkTotals(setData);
  }, [])

  if (display === 'total') return (
    <BodyWrapper>
      <TableView data={data} currentlyOnline={currentlyOnline} checkOnline={() => checkOnline(setCurrentlyOnline)}/>
      <ChartView data={data} checkTotals={() => checkTotals(setData)}/>
    </BodyWrapper>
  )

  if (display === 'individual') return (
    <BodyWrapper>
      <DateSearch data={data}/>
    </BodyWrapper>
  )

  if (display === 'about') return (
    <BodyWrapper>
      <About />
    </BodyWrapper>
  )
}

export default Body;