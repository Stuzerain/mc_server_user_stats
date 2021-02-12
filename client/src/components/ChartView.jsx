import React from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';

const ChartWrapper = styled.div`
  /* border: 1px solid black; */
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateChartButton = styled.button`
  max-width: 125px;
  `;

const ChartView = ( { data, checkTotals }) => {

  let constructedResponse = { names: [], times: []};
  data.forEach(row => {
    constructedResponse.names.push(row.name);
    constructedResponse.times.push(row.timesum);
  })

  return (
    <ChartWrapper>
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
      <UpdateChartButton onClick={checkTotals}>Update Table</UpdateChartButton>
    </ChartWrapper>
  )
}

export default ChartView;