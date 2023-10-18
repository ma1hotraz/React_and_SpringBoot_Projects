import { Box } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Dashboard1() {

    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Users',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 14],
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
                text: 'Number of Users By Months',
                align: 'left',
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
        },
    });

    return (
        <Box id="chart" style={{ border: '1px solid white', margin: '20px' }}>
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={300} />
        </Box>
    );
};


