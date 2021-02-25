import React from 'react';
import styled from 'styled-components';

import { Bar } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  border: 1px solid black;
  margin: 2%;
`;

const OverTimeChart = ({ individualData }) => {
  return (
    <ChartWrapper>
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
        width={400}
        height={400}
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
      />
    </ChartWrapper>
  );
};

export default OverTimeChart;
