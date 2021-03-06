import React, { useState } from 'react';
import OverTimeChart from './OverTimeChart.jsx';
import OverTimeTable from './OverTimeTable.jsx';
import styled from 'styled-components';
import axios from 'axios';

const { getIndividualStats } = require('../utilities/APIfunctions.js');

const DateComponentsWrapper = styled.div`
  text-align: center;
`;

const InfoHeader = styled.span`
  font-weight: bold;
  margin-top: 4px;
  background-color: white;
  border: 1px solid black;
`;

const UserDropdown = styled.span`
  margin-top: 4px;
  background-color: white;
  border: 1px solid black;
`;

const DateSearch = ({ data }) => {
  const [date, setDate] = useState('');
  const [dailyData, setDailyData] = useState({});
  const [individualData, setIndividualData] = useState({});

  const usersMap = data.map((user, index) => (
    <option key={index} value={user.peopleid}>
      {user.name}
    </option>
  ));

  return (
    <DateComponentsWrapper>
      <InfoHeader>
        Select a user to view daily playtimes for that user
      </InfoHeader>

      <form>
        <UserDropdown>
          <select
            id='user'
            defaultValue='default'
            onChange={(event) =>
              getIndividualStats(event.target.value, setIndividualData)
            }
          >
            <option value='default' disabled>
              Select a user
            </option>
            {usersMap}
          </select>
        </UserDropdown>
      </form>

      {individualData.dates && (
        <div>
          <OverTimeTable individualData={individualData} />
          <OverTimeChart individualData={individualData} />
        </div>
      )}
    </DateComponentsWrapper>
  );
};

export default DateSearch;

/*** Parts of old format -- may come back for reuse later
 * Includes ability to search by specific date  ***/

// const getDateStats = () => {
//   if (selected.length > 0 && date.length > 0) {
//     axios.get(`/api/daily/${selected}/${date}`)
//       .then(result => setDailyData(result.data[0]))
//   }
//   else console.log('please select user and date')
// }

// { dailyData.name &&

//   <table style={{border: '1px solid black', margin: 'auto', textAlign: 'center', padding: '4px'}}>
//     {/* <caption>Playtime for {date}</caption> */}
//     <thead >
//       <tr style={{backgroundColor: 'lightgray'}}>
//         <th>Name</th>
//         <th>Playtime</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>{dailyData.name}</td>
//         <td>{dailyData.dailytime}</td>
//       </tr>
//     </tbody>
//   </table>
// }

// { dailyData.name === false &&
// <div>No data found</div>}
