import React from 'react';
import ReactApexChart from 'react-apexcharts';

function generateDayWiseTimeSeries(baseDate, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseDate;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseDate += 86400000;
    i++;
  }
  return series;
}

const Dashboard4 = () => {
  const baseDate = new Date('11 Feb 2017 GMT').getTime(); // Change the base date to your desired start date
  const series = [
    {
      name: 'TEAM 1',
      data: generateDayWiseTimeSeries(baseDate, 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 2',
      data: generateDayWiseTimeSeries(baseDate, 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 3',
      data: generateDayWiseTimeSeries(baseDate, 30, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 4',
      data: generateDayWiseTimeSeries(baseDate, 10, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 5',
      data: generateDayWiseTimeSeries(baseDate, 30, {
        min: 10,
        max: 60,
      }),
    },
  ];

  const options = {
    chart: {
      height: 300,
      type: 'scatter',
      zoom: {
        type: 'xy',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      max: 70,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="scatter" height={350} />
    </div>
  );
};

export default Dashboard4;
