import { Modal, Box, Paper, Typography, Grid, Dialog, Button, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { getDeletedNotes } from '../api/DeletedNotes';

export default function TrashModal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    }

    const onClose = () => {
        setModalOpen(false);
    }

    const onOpen = () => {
        setModalOpen(true);
    }

    useEffect(() => {
        const getData = async () => {
            const noteList = await getDeletedNotes();
            setData(noteList);
        }
        getData();
    }, []);

    const handleClick = () => {
        handleClickOpen();
    }

    return (
        <Box>
            <FontAwesomeIcon icon={faTrash} size='2x' onClick={onOpen} />
            <Modal open={isModalOpen} onClose={onClose}>
                <Box component={Paper} style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '100px',
                    borderRadius: '20px'
                }}>
                    <Box sx={{
                        padding: 4,
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    }}>
                        <h1 style={{ textAlign: 'center' }}>Trash</h1>
                        {data.length !== 0 ? (
                            <Box>
                                <Grid container>
                                    {data.map((item) => {
                                        return (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                                <Box sx={{ height: '150px', width: '250px', marginTop: '20px' }} key={item.id} onClick={() => { handleClick(item.noteId) }}>
                                                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}`, height: '100%', width: '100%', position: 'relative' }}>
                                                        <Typography variant="h5" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Typography>
                                                        <Typography variant="h6" style={{
                                                            whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 4,
                                                            WebkitBoxOrient: 'vertical',
                                                            maxHeight: '3.6em',
                                                        }}>{item.description}</Typography>
                                                        <div style={{ height: '10px' }}></div>
                                                        <Typography variant="body2" color={'gray'} style={{
                                                            position: 'absolute',
                                                            bottom: 10,
                                                            width: '100%',
                                                        }}>
                                                            {item.completed === true ? `Edited On : ${item.date}` : `Created On : ${item.date}`}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        ) : (
                            <Box>
                                <HashLoader color='#f6ed22' size={50} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
            <Dialog open={isDialogOpen} onClose={handleClose} >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant='h5' textAlign={'center'}>
                        Attention !!!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Notes will automatically deleted after 30 days.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Delete
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Restore
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
