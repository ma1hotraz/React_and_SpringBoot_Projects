import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/AdminAPIs';
import ImageDisplay2 from '../component/ImageDisplay2'
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Typography } from '@mui/material';
import NoRecords from '../images/norecords.gif'

export default function DashBoardComp5() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const data = await getAllUsers();
                setAllUsers(data);
                 // console.log(data);
            } catch (error) {
                console.error('Error fetching total user size:', error);
            }
        };
        fetchAllUser();
    }, []);



    return (
        <div>
            <TableContainer component={Paper} sx={{ padding: '10px' }}>
            <Typography variant='h3' textAlign={'center'}>All Users</Typography>
                <Table sx={{ minWidth: 600 }} stickyHeader aria-label="simple table">
                
                    <TableHead>
                        
                        <TableRow>
                            <TableCell ><Typography variant='h5'>No.</Typography> </TableCell>
                            <TableCell><Typography variant='h5'>Name</Typography></TableCell>
                            <TableCell align="left"><Typography variant='h5'>Email</Typography></TableCell>
                            <TableCell align="center"><Typography variant='h5'>Image&nbsp;</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(allUsers) && allUsers.length > 0 ? (

                            allUsers.map((user, index) => (
                                <TableRow
                                    key={user.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell><Typography variant='h6'>{index + 1}</Typography></TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant='h6'>{user.name}</Typography>
                                    </TableCell>
                                    <TableCell align="left"><Typography variant='h6'>{user.email}</Typography></TableCell>
                                    <TableCell align="center">
                                        {user.image ? (
                                            <ImageDisplay2 imageData={user.image} />
                                        ) : (
                                            <Typography variant='h6'>No Image</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                                        <img src={NoRecords} alt="No Records" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

