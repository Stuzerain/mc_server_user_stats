import React from 'react';
import styled from 'styled-components';

const ModsWrapper = styled.div`;
`;

const ModsTable = styled.table`
  border: 1px solid black;
  margin: auto;
  text-align: center;
  padding: 4px;
  background-color: white;
`;

const ColoredHead = styled.thead`
  background-color: lightgray;
`;

const Mods = ( { mods } ) => {

  const mapRows = mods.names.map((mod, index) =>
  <tr key={index}>
    <td>{mod}</td>
  </tr>
  )

  return (
    <ModsWrapper>
      <ModsTable>
      <caption>Mods installed on the server</caption>
        <ColoredHead>
          <tr>
            <th>Mod Names</th>
          </tr>
        </ColoredHead>
        <tbody>
          {mapRows}
        </tbody>
      </ModsTable>
    </ModsWrapper>
  )
}

export default Mods;