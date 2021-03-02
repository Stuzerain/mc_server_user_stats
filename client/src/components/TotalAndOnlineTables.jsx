import React from 'react';
import styled from 'styled-components';
import TotalTable from './TotalTable.jsx';
import OnlineTable from './OnlineTable.jsx';

const TablesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const TotalAndOnlineTables = ({ data, currentlyOnline, online }) => {
  return (
    <TablesWrapper>
      <TotalTable data={data} />
      <OnlineTable currentlyOnline={currentlyOnline} online={online} />
    </TablesWrapper>
  );
};

export default TotalAndOnlineTables;
