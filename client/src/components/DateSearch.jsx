import React, { useState } from 'react';

import axios from 'axios';

const DateSearch = ( { data } ) => {

  const [selected, setSelected] = useState('');
  const [date, setDate] = useState('');
  const [dailyData, setDailyData] = useState({})

  const usersMap = data.map((user, index) =>
    <option key={index} value={user.peopleid}>{user.name}</option>
  )

  const getDateStats = () => {
    if (selected.length > 0 && date.length > 0) {
      axios.get(`/api/daily/${selected}/${date}`)
        .then(result => setDailyData(result.data[0]))
    }
    else console.log('please select user and date')
  }


  return (
    <div style={{margin: '2%', textAlign: 'center'}}>
      <h3>Select a user and a date to view playtime for that date</h3>

      <form>
        <label htmlFor='user'>User:</label>
        <select id='user' defaultValue='default' onChange={(event) => setSelected(event.target.value)}>
          <option value='default' disabled>Select a user</option>
          {usersMap}
        </select>
        <label htmlFor='date'>Date:</label>
        <input type='date' id='date' onChange={(event) => setDate(event.target.value)}></input>
      </form>
      <button onClick={() => getDateStats()}>Check playtime</button>

      { dailyData.name &&

        <table style={{border: '1px solid black', margin: 'auto', textAlign: 'center', padding: '4px'}}>
          {/* <caption>Playtime for {date}</caption> */}
          <thead >
            <tr style={{backgroundColor: 'lightgray'}}>
              <th>Name</th>
              <th>Playtime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dailyData.name}</td>
              <td>{dailyData.dailytime}</td>
            </tr>
          </tbody>
        </table>
      }

      { dailyData.name === false &&
      <div>No data found</div>}
    </div>
  )

}

export default DateSearch;

