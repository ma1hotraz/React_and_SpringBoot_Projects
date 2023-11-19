import React, { useEffect, useState } from 'react';
import { serverStatus } from '../api/AdminAPIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function StatusComponent() {
    const [isServerUp, setIsServerUp] = useState(null);

    const getStatus = async () => {
        try {
            const serverResponse = await serverStatus();
            setIsServerUp(!!serverResponse);
        } catch (error) {
            setIsServerUp(false);
        }
    };

    useEffect(() => {
        getStatus();
    }, []);

    return (
        <Box sx={{ height: '200px', minWidth: '300px', display: 'flex', padding: '40px', flexDirection: 'column', justifyContent: 'center' }}>
            <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '100px' }}>
                {isServerUp === null ? (
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}> <FontAwesomeIcon icon={faServer} color='yellow' size='3x' /> </CardMedia>
                ) : isServerUp ? (
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}> <FontAwesomeIcon icon={faServer} color='green' size='3x' /> </CardMedia>
                ) : (
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}> <FontAwesomeIcon icon={faServer} color='red' size='3x' /> </CardMedia>
                )}
                <CardContent><Typography sx={{display: 'flex', flexDirection : 'row', justifyContent: 'center'}} variant='h5'>{`Status ${isServerUp ? ": UP" : ": DOWN"}`}</Typography></CardContent>
            </Card>
        </Box>
    );
}
