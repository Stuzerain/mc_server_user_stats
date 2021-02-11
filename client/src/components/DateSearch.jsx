import React, { useState } from 'react';
import OverTimeChart from './OverTimeChart.jsx';
import OverTimeTable from './OverTimeTable.jsx';
import styled from 'styled-components';
import axios from 'axios';

const { getIndividualStats } = require('../utilities/APIfunctions.js');

const DateComponentsWrapper = styled.div`
  margin: 2%;
  text-align: center;
`;


const DateSearch = ( { data } ) => {

  const [selected, setSelected] = useState('');
  const [date, setDate] = useState('');
  const [dailyData, setDailyData] = useState({});
  const [individualData, setIndividualData] = useState({});

  const usersMap = data.map((user, index) =>
    <option key={index} value={user.peopleid}>{user.name}</option>
  )



  // const getIndividualStats = () => {
  //   if (selected.length > 0) {
  //     axios.get(`/api/individual/${selected}`)
  //     .then(result => {
  //       let constructedResponse = { dates: [], times: [] }
  //       result.data.forEach(row => {
  //         constructedResponse.dates.push(row.day.substring(0, 10));
  //         constructedResponse.times.push(row.dailytime);
  //       })
  //       constructedResponse.dates.sort();
  //       return setIndividualData(constructedResponse);
  //     })
  //   }
  // }


  return (
    <DateComponentsWrapper>
      <h3>Select a user to view daily playtimes across time for that user</h3>

      <form>
        <label htmlFor='user'>User:</label>
        <select id='user' defaultValue='default' onChange={(event) => setSelected(event.target.value)}>
          <option value='default' disabled>Select a user</option>
          {usersMap}
        </select>
      </form>
      <button onClick={() => getIndividualStats(selected, setIndividualData)}>Check playtime</button>

      {individualData.dates &&
        <div>
        <OverTimeTable individualData={individualData} />
        <OverTimeChart individualData={individualData} />
        </div>
      }
    </DateComponentsWrapper>
  )

}

export default DateSearch;


/*** Parts of old format -- may come back for reuse later  ***/


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