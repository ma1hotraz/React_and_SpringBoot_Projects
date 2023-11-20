import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getDBSize } from '../api/AdminAPIs';
import { Box, Paper } from '@mui/material';

export default function Dashboard3() {
    const [dbSize, setDBSize] = useState(0);

    useEffect(() => {
        const fetchDBSize = async () => {
            try {
                const data = await getDBSize();
                setDBSize(data);
            } catch (error) {
                console.error('Error fetching db size');
            }
        }
        fetchDBSize();
    }, []);

    const finalValue = (dbSize / 10) * 100;


    const series = [finalValue];
    const options = {
        chart: {
            height: 300,
            type: 'radialBar',
            offsetY: -10,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120,
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                            return val + '%';
                        },
                    },
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91],
            },
        },
        stroke: {
            dashArray: 4,
        },
        labels: ['DB Size'],
    };

    return (
        <div id="chart">
            <Box component={Paper}>
                <ReactApexChart options={options} series={series} type="radialBar" height={300} />
            </Box>
        </div>
    );
};

