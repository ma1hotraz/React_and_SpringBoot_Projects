import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getTotalUserSize } from '../api/AdminAPIs';

export default function DashBoardComp4() {
    const [totalUsers, setTotalUsers] = useState(null);

    useEffect(() => {
        const fetchTotalUserSize = async () => {
            try {
                const data = await getTotalUserSize();
                setTotalUsers(data);
            } catch (error) {
                console.error('Error fetching total user size:', error);
            }
        };
        fetchTotalUserSize();
    }, []);

    return (
        <Box sx={{ }}>
            <Card sx={{ height: '195px', display: 'flex', padding: '40px' ,flexDirection: 'column', justifyContent: 'center' }}>
                <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faUser} size='3x' />
                </CardMedia>
                <CardContent>
                    <Typography variant='h5' align='center'>
                        {totalUsers !== null ? `Total Users : ${totalUsers}` : 'Loading...'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
