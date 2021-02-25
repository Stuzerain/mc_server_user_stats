import React from 'react';
import styled from 'styled-components';

import { Bar } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JustChart = styled.div`
  border: 1px solid black;
`;

const OverTimeChart = ({ individualData }) => {
  return (
    <ChartWrapper>
      <JustChart>
        <Bar
          data={{
            datasets: [
              {
                borderColor: 'black',
                backgroundColor: 'blue',
                label: 'Time played in minutes',
                data: individualData.times,
                yAxisID: 'time',
              },
            ],
            labels: individualData.dates,
          }}
          width={1000}
          height={500}
          options={{
            maintainAspectRatio: false,
            color: ['blue'],
            scales: {
              yAxes: [
                {
                  id: 'time',
                  type: 'linear',
                  beginAtZero: true,
                },
              ],
            },
          }}
        />{' '}
      </JustChart>
    </ChartWrapper>
  );
};

export default OverTimeChart;
