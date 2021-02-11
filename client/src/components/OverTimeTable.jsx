import React from 'react';

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

  <table style={{border: '1px solid black', margin: 'auto', textAlign: 'center', padding: '4px'}}>
    <thead >
      <tr style={{backgroundColor: 'lightgray'}}>
        <th>Date</th>
        <th>Playtime</th>
      </tr>
    </thead>
    <tbody>
      {dataMapper()}
    </tbody>
  </table>

  )

}

export default OverTimeTable;
