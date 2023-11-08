import { Modal, Box, Paper, Typography, Grid, Dialog, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HashLoader } from 'react-spinners';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { archivedList, restoreFromArchive } from '../api/ArchivedNotes';


export default function TrashModal(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [noteArchived, setNoteArchived] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [noteId, setNoteId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '400px',
        width: '75%',
        borderRadius: '12px',
        backgroundColor: `${props.modalBg}`,
        boxShadow: 16,
        padding: '20px'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);



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
        setNoteArchived(true);
    }

    const getData = async () => {
        const noteList = await archivedList();
        setData(noteList);
        setNoteArchived(false);
    }

    const handleClick = (noteId) => {
        setNoteId(noteId);
        handleClickOpen();
    }

    const handleRestore = async () => {
        setLoading(true);
        await restoreFromArchive(noteId);
        setLoading(false);
        handleClose();
    }

    useEffect(() => {
        getData();
    }, [noteArchived, noteId]);

    return (
        <div>
            <Tooltip title={'Archive'}>
                <FontAwesomeIcon icon={faInbox} size='2x' onClick={onOpen} />
                <Modal open={isModalOpen} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={style}>
                        <h1 style={{ textAlign: 'center' }}>Archive</h1>
                        {data.length !== 0 ? (
                            <>
                                {isLoading === true ? <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '20px'
                                }}>
                                    <HashLoader color='#f6ed22' size={100} />
                                </Box> : <Grid container>
                                    {data.map((item) => {
                                        return (
                                            <Grid item xs={12} sm={6} md={4} lg={3} spacing={1} sx={{ margin: '20px 0 20px 0' }}>
                                                <Box sx={{ height: '150px', width: '250px' }} key={item.noteId} onClick={() => { handleClick(item.noteId) }}>
                                                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}`, height: '100%', width: '100%', position: 'relative' }} className="note">
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
                                }
                            </>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px'
                            }}>
                                {showLoader ? (
                                    <h1>NO CONTENT</h1>
                                ) : (
                                    <HashLoader color='#f6ed22' size={100} />
                                )}

                            </Box>
                        )}
                    </Box>
                </Modal>
                <Dialog open={isDialogOpen} onClose={handleClose}>
                    <DialogTitle id="responsive-dialog-title">
                        <Typography variant='h5' textAlign={'center'}>
                            Attention !!! "Cannot Edit Archived Notes"
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant='p' align='center'>
                                Restore Note to Notes Page to Edit
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ padding: '20px' }} onClose>
                        <Button variant='contained' color='primary' onClick={handleRestore}>
                            Restore
                        </Button>
                    </DialogActions>
                </Dialog>
            </Tooltip>
        </div>
    );
}
