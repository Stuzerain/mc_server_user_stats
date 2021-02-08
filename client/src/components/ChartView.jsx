import React, { useState, useEffect } from 'react';

import {Line} from 'react-chartjs-2';

const ChartView = ( { data, checkTotals }) => {

  let constructedResponse = { names: [], times: []};
  data.forEach(row => {
    constructedResponse.names.push(row.name);
    constructedResponse.times.push(row.timesum);
  })

  return (
    <div style={{border: '1px solid black', margin: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Line
      data={
        {datasets: [{
          borderColor: 'black',
          backgroundColor: 'pink',
          label: 'Time played in minutes',
          data: constructedResponse.times,
          yAxisID: 'time'
        }],
        labels: constructedResponse.names
      }
      }
      width={400}
      height={400}
      options={
        {
          maintainAspectRatio: false,
          color: ['blue'],
          scales: {
            yAxes: [{
                id: 'time',
                type: 'linear',
                beginAtZero: true
            }]
        }
        }
      }
      />
      <button style={{maxWidth: '125px'}}onClick={checkTotals}>Update Table</button>
    </div>
  )
}

export default ChartView;