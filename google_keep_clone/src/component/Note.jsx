import React, { useEffect, useState } from 'react';
import NoteData, { getData } from '../api/NoteData';
import { Grid, Paper, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getById } from '../api/EditNote';
import { getRandomColor } from '../utils/ColorList';
import NoteModal from './NoteModel';
import { deleteById } from '../api/DeleteNote';
import { addNote } from '../api/AddNote';
import { updateData } from '../api/UpdateNote';
import nodataImage from '../images/nodata.png';
import '../css/NoData.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Note() {

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [noteData, setNoteData] = useState(null);
    const [noteTitle, setNoteTitle] = useState();
    const [noteDescription, setNoteDescription] = useState();
    const [selectedNoteId, setSelectedNoteId] = useState(null);


    const handleCreateNote = () => {
        setModalMode('create');
        setSelectedNoteId(null);
        setNoteData(null);
        setIsModalOpen(true);
    };


    const fetchAndRefreshData = () => {
        getData()
            .then((newData) => {
                setData(newData || []);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    const handleDeleteNote = () => {
        deleteById(selectedNoteId)
            .then(() => {
                fetchAndRefreshData();
                setIsModalOpen(false);
                setSelectedNoteId(null);
                toast.warn('Note deleted successfully!', {
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
                toast.error('Some went wrong', {
                    autoClose: 3000,
                });
            });
    };


    useEffect(() => {
    }, [noteTitle, noteDescription]);


    const handleSaveNote = (title, description) => {

        //TODO HERE WE NEEED TO FIX THE ISSUE 
        /* issue : state variables is not updating inside the function after assigning the value */

        // setNoteTitle(title);
        // setNoteDescription(description);

        /* WILL FIX IT LATER */



        const newNoteData = {
            title: title,
            description: description,
            completed: false,
            color: getRandomColor(),
            user: {
                userId: 1,
                // email: 'email',
                // firstName: 'Name',
                // lastName: 'last',
                // password: 'pass',
                // role: 'USER',
                // notes: []
            }
        };

        if (modalMode === 'create') {
            addNote(newNoteData)
                .then(() => {
                    fetchAndRefreshData();
                    setIsModalOpen(false);
                    setSelectedNoteId(null);
                    setNoteTitle('');
                    title = '';
                    description = '';
                    setNoteDescription('');
                    toast.success('Note added successfully!', {
                        autoClose: 3000,
                    });
                })
                .catch((error) => {
                    console.error('Error creating note:', error);
                    toast.error('Something went wrong', {
                        autoClose: 3000,
                    });
                });
            handleCloseModel();
        } else if (modalMode === 'edit') {
            updateData(selectedNoteId, newNoteData)
                .then(() => {
                    fetchAndRefreshData();
                    setIsModalOpen(false);
                    setSelectedNoteId(null);
                    setNoteTitle('');
                    setNoteDescription('');
                    title = '';
                    description = '';
                    toast.success('Note Edited successfully!', {
                        autoClose: 3000,
                    });
                })
                .catch((error) => {
                    console.error('Error editing note:', error);
                    toast.error('Something went wrong', {
                        autoClose: 3000,
                    });
                });
            handleCloseModel();
        }
    };


    useEffect(() => {
        if (selectedNoteId !== null) {
            getById(selectedNoteId)
                .then((data) => {
                    setNoteData(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedNoteId]);

    const handleCloseModel = () => {
        setIsModalOpen(false);
    };

    const handleClick = (itemId) => {
        setSelectedNoteId(itemId);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    // const predefinedHeights = ['200px', '250px', '280px', '300px'];

    // const getRandomHeight = () => {
    //     // Get a random index from predefinedHeights array
    //     const randomIndex = Math.floor(Math.random() * predefinedHeights.length);
    //     return predefinedHeights[randomIndex];
    //   };

    // const getRandomWidth = () => {
    //     return `${Math.floor(Math.random() * (400 - 300 + 1) + 300)}px`;
    // };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <NoteData setData={setData} />
            {data.length !== 0 ? (
                <div style={{ marginTop: '80px', position: 'relative', width: '100%', height: '100%' }}>
                    <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
                        {data.map((item) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                    <Box sx={{ height: '200px', width: '300px' }} key={item.id} onClick={() => { handleClick(item.noteId) }}>
                                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}`, height: '100%', width: '100%', position: 'relative' }} className="note">
                                            <Typography variant="h5" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Typography>
                                            <Typography variant="h6" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</Typography>
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

                    <Box sx={{ color: 'red', position: 'fixed', bottom: '20px', right: '20px' }} >
                        <Fab aria-label="add" onClick={handleCreateNote}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </div>
            ) : (
                <div>
                    <div className="main-div">
                        <div className="empty-state">
                            <div className="empty-state__content">
                                <div className="empty-state__icon">
                                    <img src={nodataImage} alt="" />
                                </div>
                                <div className="empty-state__message">No records has been added yet.</div>
                                <div className="empty-state__help">
                                    Add a new record by simpley clicking the button on bottom right side.
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '80px', textAlign: 'center' }}>
                            <Box sx={{ position: 'fixed', bottom: '20px', right: '20px' }} >
                                <Fab aria-label="add" size='large' onClick={handleCreateNote}>
                                    <AddIcon />
                                </Fab>
                            </Box>
                        </div>
                    </div>
                </div>
            )}

            <NoteModal
                selectedId={selectedNoteId}
                isOpen={isModalOpen}
                handleClose={handleCloseModel}
                title={noteData?.title}
                description={noteData?.description}
                handleSaveNote={handleSaveNote}
                handleDelete={handleDeleteNote}
                mode={modalMode}
            />
        </div>
    );
}
