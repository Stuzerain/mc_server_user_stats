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

const NotOnlineRow = styled.tr`
  background-color: pink;
`;

const TableView = ( { data, currentlyOnline, checkOnline }) => {

  const mapRows = data.map((person, index) =>
    <tr key={index}>
      <td>{person.name}</td>
      <td>{person.timesum}</td>
    </tr>
    )

  const mapOnline = currentlyOnline.map((name, index) =>
    <tr key={index}>
      <td>{name}</td>
    </tr>
    )

  const noOnline = () =>
    <NotOnlineRow>
      <td>No players online</td>
    </NotOnlineRow>

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
        <tbody>
          {mapRows}
        </tbody>
      </PlaytimeTable>

        <PlaytimeTable>
          <caption>Currently online</caption>
          <ColoredHead>
            <tr >
              <th>Name</th>
            </tr>
          </ColoredHead>
          <tbody>
            {currentlyOnline.length ? mapOnline : noOnline()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={checkOnline}>Refresh table</button>
              </td>
            </tr>
          </tfoot>
        </PlaytimeTable>
    </TablesWrapper>
  )
}

export default TableView;