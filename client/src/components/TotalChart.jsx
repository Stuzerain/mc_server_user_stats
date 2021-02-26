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

const UpdateChartButton = styled.button`
  max-width: 125px;
`;

const TotalChart = ({ data }) => {
  let constructedResponse = { names: [], times: [] };
  data.forEach((row) => {
    constructedResponse.names.push(row.name);
    constructedResponse.times.push(row.timesum);
  });

  return (
    <ChartWrapper>
      <JustChart>
        <Bar
          data={{
            datasets: [
              {
                borderColor: 'black',
                backgroundColor: 'pink',
                label: 'Time played in minutes',
                data: constructedResponse.times,
                yAxisID: 'time',
              },
            ],
            labels: constructedResponse.names,
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
        />
      </JustChart>
    </ChartWrapper>
  );
};

export default TotalChart;
