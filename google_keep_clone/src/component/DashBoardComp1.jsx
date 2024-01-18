import React, { useEffect, useState } from 'react';
import { getLogs } from '../api/GetLogs';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { serverStatus } from '../api/AdminAPIs';

export default function DashBoardComp1() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setLoading] = useState(false);

    // const containerRef = React.useRef(null);

    const getData = async () => {
        try {
            setLoading(true);
            const logsData = await getLogs();
            setLogs(logsData);
        } catch (error) {
            toast.warn(error.message, { autoClose: 1000 });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleRefresh = () => {
        getData();
    };

    return (
        <div>
            <Box
                sx={{
                    height: '50px',
                    backgroundColor: 'grey',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: '10px',
                }}
            >
                <FontAwesomeIcon
                    spin={isLoading}
                    icon={faArrowsRotate}
                    size='2x'
                    onClick={handleRefresh}
                />
            </Box>
            <Box
                sx={{
                    backgroundColor: 'black',
                    position: 'relative',
                }}
            >
                {isLoading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: '1',
                        }}
                    >
                        <HashLoader color='#f6ed22' size={100} />
                        {serverStatus ? '' : <Typography variant='body'>Server is buzy</Typography>}
                    </Box>
                )}
                <Box
                    // ref={containerRef}
                    sx={{
                        border: '2px solid black',
                        color: 'white',
                        padding: '10px',
                        height: '60vh',
                        minWidth: 600,
                        overflow: 'auto',
                    }}
                >
                    <Box>
                        {/* {!serverStatus ? (<>{Array.isArray(logs) && logs.length > 0 ? (
                            logs.map((log, index) => (
                                <Typography key={index} variant="body2">
                                    {log.data}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2">No logs available</Typography>
                        )}
                            <ScrollButton containerRef={containerRef} /></>) : (<><Typography>
                                Server is Offline
                            </Typography></>)} */}
                        {serverStatus === false ? (
                            <Typography variant="body2">No logs available</Typography>
                        ) : (
                            Array.isArray(logs) && logs.length > 0 ? (
                                logs.map((log, index) => (
                                    <Typography key={index} variant="body2">
                                        {log.data}
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2">No logs available</Typography>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
        </div>
    );
}


