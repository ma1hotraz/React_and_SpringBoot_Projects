import React, { useEffect, useState } from 'react';
import NoteData, { getData } from '../api/NoteData';
import { Grid, Paper, Typography, Box, Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getById } from '../api/EditNote';
import { getRandomColor } from '../utils/ColorList';
import NoteModal from './NoteModel';
import { deleteById } from '../api/DeleteNote';
import { addNote } from '../api/AddNote';
import { updateData } from '../api/UpdateNote';
import '../css/NoData.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import getText from '../utils/TextUtils';
import { archivedTo } from '../api/ArchiveNote';
import { Archive } from '@mui/icons-material';
import Draggable from 'react-draggable';
import { getRandomBg } from '../utils/NotesBackround';
import nodataImage from '../images/nodata.png';

export var fetchAndRefreshData = () => {

};


export default function Note(props) {

    const [isLoading, setisLoading] = useState(false);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [noteData, setNoteData] = useState(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
    const [currentNoteBg, setCurrentNoteBg] = useState(null);

    const handleCreateNote = () => {
        console.log('called note')
        setModalMode('create');
        setSelectedNoteId(null);
        setNoteData(null);
        setNoteTitle('');
        setNoteDescription('');
        setIsModalOpen(true);
    };

    fetchAndRefreshData = () => {
        getData()
            .then((newData) => {
                const view = localStorage.getItem('view');
                // console.log(view);
                // console.log('data before: ', data);

                if (newData) {
                    let updatedData = [...newData];
                    switch (view) {
                        case "Date":
                            updatedData = updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                            break;

                        case "Title":
                            updatedData = updatedData.sort((a, b) => a.title.localeCompare(b.title));
                            break;

                        default:
                            break;
                    }
                    setData(updatedData);
                    // console.log('data after: ', updatedData);
                } else {
                    setData([]);
                    // console.log('data after: ', []);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }


    const handleDeleteNote = () => {
        deleteById(selectedNoteId)
            .then(() => {
                fetchAndRefreshData();
                setIsModalOpen(false);
                setSelectedNoteId(null);
                toast.warn(getText('Note deleted!'), {
                    autoClose: 1000,
                });
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
                toast.error('Some went wrong', {
                    autoClose: 1000,
                });
            });
    };

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('userData'));
        if (items) {
            setCurrentUser(items);
        }
    }, []);

    const handleSaveNote = (title, description) => {
        const newNoteData = {
            title: title,
            description: description,
            completed: false,
            color: getRandomColor(),
            imageBg: getRandomBg(),
            user: {
                userId: currentUser.userId,
            },
        };

        if (modalMode === 'create') {
            addNote(newNoteData)
                .then(() => {
                    fetchAndRefreshData();
                    setIsModalOpen(false);
                    setSelectedNoteId(null);
                    setNoteTitle('');
                    setNoteDescription('');
                    clearTitleAndDescription();
                    toast.success('Note added!', {
                        autoClose: 1000,
                    });
                })
                .catch((error) => {
                    console.error('Error creating note:', error);
                    toast.error('Something went wrong', {
                        autoClose: 1000,
                    });
                });
            handleCloseModel();
        } else if (modalMode === 'edit') {
            if (!selectedNoteId) {
                return;
            }
            updateData(selectedNoteId, newNoteData)
                .then(() => {
                    fetchAndRefreshData();
                    setIsModalOpen(false);
                    setSelectedNoteId(null);
                    setNoteTitle('');
                    setNoteDescription('');
                    clearTitleAndDescription();
                    toast.success('Note Edited!', {
                        autoClose: 1000,
                    });
                })
                .catch((error) => {
                    console.error('Error editing note:', error);
                    toast.error('Something went wrong', {
                        autoClose: 1000,
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

    const clearTitleAndDescription = () => {
        setNoteTitle('');
        setNoteDescription('');
    };


    const toggleSearchBox = () => {
        setIsSearchBoxVisible(!isSearchBoxVisible);
    };

    const handleArchive = (noteId) => {
        archivedTo(noteId);
        fetchAndRefreshData();
    }

    useEffect(() => {
        fetchAndRefreshData();
    }, [selectedNoteId]);


    useEffect(() => {
        if (data && data.length > 0) {
            setTimeout(() => {
                setisLoading(false);
            }, 6000);
        }

    }, [noteData]);


    return (
        <Box>
            <Box>
                <FontAwesomeIcon style={{ marginTop: '80px', marginBottom: '-80px', marginLeft: '10px' }} icon={faSearch} color={props.buttonColor} size='3x' onClick={toggleSearchBox} />
                {isSearchBoxVisible && <SearchBox buttonColor={props.buttonColor} noteId={setSelectedNoteId} onItemClick={handleClick} color={props.color} />}
            </Box>
            <Box sx={{ minHeight: '90vh' }}>
                <NoteData setData={data !== null ? setData : null} />
                {data && data.length > 0 ? (
                    <Box sx={{ marginTop: '100px' }}>
                        <Grid container>
                            {data.map((item) => {
                                return (
                                    <Grid sx={{ width: '100vw' }} display={"flex"}
                                        justifyContent={"center"} item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                        <Draggable scale={1} grid={[25, 25]} >
                                            <Box sx={{ height: '200px', width: '300px', marginTop: '20px', border: '1px solid grey', borderRadius: '4px' }} key={item.id} onClick={() => { handleClick(item.noteId); setCurrentNoteBg(item.imageBg) }}>
                                                <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${item.color}`, backgroundImage: `${item.imageBg}`, backdropFilter: 'sepia(90%)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', width: '100%', position: 'relative' }} >
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="h5" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: `${props.color}`, fontFamily: "'Inconsolata', monospace", }}>{item.title}</Typography>
                                                        <Box onClick={() => {
                                                            handleClick(item.noteId);
                                                        }}>
                                                            <Tooltip title='Archive'><IconButton onClick={e => e.stopPropagation()}  >
                                                                <Archive sx={{}} className="hover-effect" onClick={() => handleArchive(item.noteId)} />
                                                            </IconButton></Tooltip>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="h6" sx={{
                                                        whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 4,
                                                        WebkitBoxOrient: 'vertical',
                                                        maxHeight: '3.6em',
                                                        color: `${props.color}`,
                                                        fontFamily: "'Inconsolata', monospace",
                                                    }}>{item.description}</Typography>
                                                    <div style={{ height: '10px' }}></div>
                                                    <Typography variant="body2" sx={{
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        width: '100%',
                                                        color: `${props.color}`,
                                                        fontFamily: "'Inconsolata', monospace",
                                                    }}>
                                                        {item.completed === true ? `Edited : ${item.date}` : `Created : ${item.date}`}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                        </Draggable>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Box sx={{ color: 'red', position: 'fixed', bottom: '20px', right: '20px' }} >
                            <Fab aria-label="add" onClick={handleCreateNote}>
                                <AddIcon />
                            </Fab>
                        </Box>
                    </Box>
                ) : (
                    <div>
                        <div className="main-div">
                            <div className="empty-state">
                                <div className="empty-state__content">
                                    <div className="empty-state__icon">
                                        <img src={nodataImage} alt="nodata_img" />
                                    </div>
                                    <div className="empty-state__message">{getText('No note has been added yet.')}</div>
                                    <div className="empty-state__help">
                                        {getText('Add a new note by simpley clicking the button on bottom right side.')}
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
                )
                }
                <NoteModal
                    selectedId={selectedNoteId}
                    isOpen={isModalOpen}
                    handleClose={handleCloseModel}
                    title={noteData?.title}
                    description={noteData?.description}
                    handleSaveNote={handleSaveNote}
                    handleDelete={handleDeleteNote}
                    mode={modalMode}
                    clearTitleAndDescription={clearTitleAndDescription}
                    imageBg={currentNoteBg}
                    modalColor={props.modalBg}
                    textColor={props.color}
                />
            </Box>
        </Box>
    );
}


