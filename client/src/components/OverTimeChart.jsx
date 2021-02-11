import React from 'react';

import { Line } from 'react-chartjs-2';

const OverTimeChart = ( { individualData } ) => {

  return (

    <Line
      data={
        {datasets: [{
          borderColor: 'black',
          backgroundColor: 'blue',
          label: 'Time played in minutes',
          data: individualData.times,
          yAxisID: 'time'
        }],
        labels: individualData.dates
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

  )

}

export default OverTimeChart;
