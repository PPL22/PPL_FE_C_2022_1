import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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
  return <Doughnut data={showData} />;
}

export default Charts;
