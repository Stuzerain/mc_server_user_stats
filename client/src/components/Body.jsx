import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import TotalChart from './TotalChart.jsx';
import TotalTable from './TotalTable.jsx';
import DateSearch from './DateSearch.jsx';
import About from './About.jsx';

const { checkTotals, checkOnline } = require('../utilities/APIfunctions.js');

const BodyWrapper = styled.div`
  background-image: url(dirt.jpg);
  height: 100vh;
  padding: 2%;
`;

const Body = ( { display } ) => {
  /*** state that holds player data and list of currently online players ***/
  const [data, setData] = useState([]);
  const [currentlyOnline, setCurrentlyOnline] = useState([]);

  useEffect(() => {
    checkOnline(setCurrentlyOnline);
    checkTotals(setData);
  }, [])
  /*----------------------------*/

  if (display === 'total') return (
    <BodyWrapper>
      <TotalTable data={data} currentlyOnline={currentlyOnline} checkOnline={() => checkOnline(setCurrentlyOnline)}/>
      <TotalChart data={data} checkTotals={() => checkTotals(setData)}/>
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