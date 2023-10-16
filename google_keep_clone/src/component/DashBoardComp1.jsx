import { Box } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Dashboard1 = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    },
  });

  return (
    <Box id="chart" style={{border: '1px solid white', margin: '20px'}}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={300} />
    </Box>
  );
};

export default Dashboard1;
