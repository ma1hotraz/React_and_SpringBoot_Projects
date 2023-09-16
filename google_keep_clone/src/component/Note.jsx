import React, { useState } from 'react';
import NoteData from './NoteData';
import { Grid, Paper, Typography, Modal, Box, Fab, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const colorList = [
        "#F28B82",
        "#FBBC04",
        "#FFF475",
        "#CCFF90",
        "#A7FFEB",
        "#CBF0F8",
        "#AECBFA",
        "#D7AEFB",
        "#FDCFE8",
        "#E6C9A8",
        "#E8EAED",
    ];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    }

    const handleClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <NoteData setData={setData} />

            {data.length !== 0 ? (
                <div style={{ marginTop: '80px', position: 'relative', width: '100%', height: '100%' }}>

                    <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
                        {data.map((item) => {
                            const randomColor = getRandomColor();
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                    <Box sx={{ height: 'auto', width: 'auto' }} onClick={handleClick}>
                                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: randomColor }} className="note">
                                            <Typography variant="body1">{item.userId}</Typography>
                                            <Typography variant="body1">{item.id}</Typography>
                                            <Typography variant="h5">{item.title}</Typography>
                                            <Typography variant="h5">{item.completed}</Typography>
                                            {/* {item.completed && (
                                                <Typography variant="h6">Completed: {item.completed}</Typography>
                                            )} */}

                                        </Paper>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }} >
                        <Fab color="primary" aria-label="add" onClick={handleClick} >
                            <AddIcon />
                        </Fab>
                    </Box>
                </div>
            ) : (
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <h1>No data available</h1>
                </div>
            )}

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        borderRadius: '12px',
                        padding: '16px 32px 24px 32px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: 16,
                    }}
                >
                    <h2 id="modal-title">Title</h2>
                    <TextField fullWidth id="standard-basic" label="title" variant="standard" />
                    <p id="modal-description">Description</p>
                    <TextField fullWidth id="standard-basic" label="description" variant="outlined" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                        <IconButton aria-label="delete">
                            <DeleteIcon sx={{color:'red'}}/>
                        </IconButton>
                        <Button variant="contained" color='success'>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
