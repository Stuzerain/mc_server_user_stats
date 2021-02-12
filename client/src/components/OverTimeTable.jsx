import React from 'react';
import styled from 'styled-components';

const ColoredHead = styled.thead`
  background-color: lightgray;
`;

const PlaytimeTable = styled.table`
  border: 1px solid black;
  margin: auto;
  text-align: center;
  padding: 4px;
  background-color: white;
`;

const OverTimeTable = ( { individualData } ) => {

  const dataMapper = () => {
    let output = [];
    for (let i = 0; i < individualData.dates.length; i++) {
      output.push(
        <tr key={i}>
          <td>{individualData.dates[i]}</td>
          <td>{individualData.times[i]}</td>
        </tr>

      )
    }

    return output.map(row => row)
  }



  return (

  <PlaytimeTable>
    <ColoredHead >
      <tr>
        <th>Date</th>
        <th>Playtime</th>
      </tr>
    </ColoredHead>
    <tbody>
      {dataMapper()}
    </tbody>
  </PlaytimeTable>

  )

}

export default OverTimeTable;
