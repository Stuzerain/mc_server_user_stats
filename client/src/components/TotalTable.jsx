import React from 'react';
import styled from 'styled-components';

const PlaytimeTable = styled.table`
  border: 1px solid black;
  margin: auto;
  text-align: center;
  padding: 4px;
  background-color: white;
`;

const TablesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const ColoredHead = styled.thead`
  background-color: lightgray;
`;

const TotalTable = ({ data }) => {
  const mapRows = data.map((person, index) => (
    <tr key={index}>
      <td>{person.name}</td>
      <td>{person.timesum}</td>
    </tr>
  ));

  return (
    <TablesWrapper>
      <PlaytimeTable>
        <caption>Total playtime of users</caption>
        <ColoredHead>
          <tr>
            <th>Name</th>
            <th>Total Time</th>
          </tr>
        </ColoredHead>
        <tbody>{mapRows}</tbody>
      </PlaytimeTable>
    </TablesWrapper>
  );
};

export default TotalTable;
