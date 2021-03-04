import React from 'react';
import styled from 'styled-components';

const OnTable = styled.table`
  border: 1px solid black;
  margin: auto;
  text-align: center;
  padding: 4px;
  background-color: white;
`;

const ColoredHead = styled.thead`
  background-color: lightgray;
`;

const NotOnlineRow = styled.tr`
  background-color: pink;
`;

const OnlineTable = ({ currentlyOnline, online }) => {
  if (!currentlyOnline) {
    currentlyOnline = [];
  }

  const noOnline = () => (
    <NotOnlineRow>
      <td>No players online</td>
    </NotOnlineRow>
  );

  const tableDisplay = () => {
    if (currentlyOnline.length) {
      return currentlyOnline.map((name, index) => (
        <tr key={index}>
          <td>{name}</td>
        </tr>
      ));
    } else {
      return (
        <NotOnlineRow>
          <td>No players online</td>
        </NotOnlineRow>
      );
    }
  };

  if (online) {
    return (
      <OnTable>
        <caption>Currently online</caption>
        <ColoredHead>
          <tr>
            <th>Name</th>
          </tr>
        </ColoredHead>
        <tbody>{tableDisplay()}</tbody>
      </OnTable>
    );
  } else {
    return (
      <OnTable>
        <ColoredHead>
          <tr>
            <th>Server is currently offline</th>
          </tr>
        </ColoredHead>
      </OnTable>
    );
  }
};

export default OnlineTable;
