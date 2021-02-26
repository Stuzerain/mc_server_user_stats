import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import TotalChart from './TotalChart.jsx';
import TotalTable from './TotalTable.jsx';
import DateSearch from './DateSearch.jsx';
import About from './About.jsx';

const { checkTotals, getRawData } = require('../utilities/APIfunctions.js');

const BodyWrapper = styled.div`
  background-image: url(dirt.jpg);
  height: 100vh;
  padding: 2%;
`;

const RefreshButton = styled.button`
  display: inline-block;
  margin: 0 50%;
`;

const Body = ({ display }) => {
  /*** state that holds player data and list of currently online players ***/
  const [rawData, setRawData] = useState({});
  const [data, setData] = useState([]);
  const [currentlyOnline, setCurrentlyOnline] = useState(null);

  const refreshRawDataAndCheckTotals = () => {
    getRawData(setRawData, setCurrentlyOnline);
    checkTotals(setData);
  };

  useEffect(() => {
    refreshRawDataAndCheckTotals();
  }, []);
  /*----------------------------*/

  if (display === 'total')
    return (
      <BodyWrapper>
        <RefreshButton>Refresh Online List and Chart</RefreshButton>
        <TotalTable data={data} currentlyOnline={currentlyOnline} />
        <TotalChart data={data} />
      </BodyWrapper>
    );

  if (display === 'individual')
    return (
      <BodyWrapper>
        <DateSearch data={data} />
      </BodyWrapper>
    );

  if (display === 'about')
    return (
      <BodyWrapper>
        <About rawData={rawData} />
      </BodyWrapper>
    );
};

export default Body;
