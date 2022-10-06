import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
function Charts({ data }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const showData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.elements,
        backgroundColor: data.colors,
        borderColor: ['#EEF0FA', '#EEF0FA'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 20,
        },
      },
    },
  };
  return (
    <Doughnut data={showData} plugins={[ChartDataLabels]} options={options} />
  );
}

export default Charts;
