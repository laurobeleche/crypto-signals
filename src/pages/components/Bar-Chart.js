// components/Bar-Chart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

// Registrar as escalas
import { LinearScale } from 'chart.js/auto';
Chart.register(LinearScale);

const BarChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: data,
        borderColor: 'rgba(10, 150, 250, 0.7)',
        backgroundColor: 'rgba(10, 150, 250, 0.2)',
        borderWidth: 1,
        
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
            
            label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETH', minimumFractionDigits: 8}).format(context.parsed.y);
                }
                return label;
              }
           }
        }
    },
    scales: {
        x: {
          grid: {
            display: false, // Esconde as linhas de grade horizontais
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false, // Esconde as linhas de grade verticais
          },
        },
      },
      borderRadius: 3,
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
