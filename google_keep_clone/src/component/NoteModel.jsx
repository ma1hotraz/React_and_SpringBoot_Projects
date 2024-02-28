import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, IconButton, InputBase, Typography, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '../api/EditNote';
import getText from '../utils/TextUtils';


export default function NoteModal({
    isOpen,
    handleClose,
    title,
    description,
    handleSaveNote,
    handleDelete,
    mode,
    selectedId,
    clearTitleAndDescription,
    imageBg,
    modalColor
}) {
    const [isLoading, setisLoading] = useState(true);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteData, setNoteData] = useState([]);
    const [modalBg, setModalBg] = useState(null);

    const isSaveDisabled = !noteTitle.trim() || !noteDescription.trim();

    useEffect(() => {
        if (mode === 'edit') {
            setNoteTitle(noteData.title || '');
            setNoteDescription(noteData.description || '');
            setNoteData([]);
            setModalBg(mode === 'edit' ? imageBg : '');
        } else {
            setNoteTitle('');
            setNoteDescription('');
            setNoteData([]);
            setModalBg('');
        }
        setNoteData([]);
    }, [title, description, mode, imageBg]);


    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setNoteDescription(e.target.value);
    };

    const handleSaveClick = () => {
        if (!isSaveDisabled) {
            handleSaveNote(noteTitle, noteDescription);
            clearTitleAndDescription();
        }
    };

    useEffect(() => {
        if (noteData.length > 0) {
            console.log("before : ", isLoading);
            setTimeout(() => {
                setisLoading(false);
            }, 1000);
            console.log("after : ", isLoading);
        }

    }, [noteData]);



    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 300,
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: 16,
                        justifyContent: 'space-between',
                        display: 'block',
                        backgroundImage: `${modalBg}`,
                        backdropFilter: 'sepia(90%)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid grey',
                        backgroundColor: `${modalColor}`,
                    }}
                >
                    <Typography id="modal-title" variant='h5' sx={{ margin: '10px 0 10px 0' }}>
                        {mode === 'create' ? getText('Create Note') : getText('Edit Note')}
                    </Typography>


                    <InputBase
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={noteTitle}
                        onChange={handleTitleChange}
                        placeholder='Title'
                    />
                    <div style={{ height: '20px' }}></div>
                    <InputBase
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={6}
                        value={noteDescription}
                        onChange={handleDescriptionChange}
                        placeholder='Description'
                    />
                    {/* {isLoading && mode === 'edit' ? (
                        <>
                            <Skeleton
                                variant="rounded"
                                sx={{ bgcolor: 'grey.900', margin: '20px' }}
                                fullWidth
                                height={50}
                            />
                            <Skeleton
                                variant="rounded"
                                fullWidth
                                sx={{ bgcolor: 'grey.900', margin: '20px' }}
                                height={100}
                            />
                        </>
                    ) : (
                        <>
                            <InputBase
                                fullWidth
                                label="Title"
                                variant="outlined"
                                value={noteTitle}
                                onChange={handleTitleChange}
                                placeholder='Title'
                            />
                            <div style={{ height: '20px' }}></div>
                            <InputBase
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={6}
                                value={noteDescription}
                                onChange={handleDescriptionChange}
                                placeholder='Description'
                            />
                        </>
                    )} */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        {mode === 'edit' && (
                            <IconButton aria-label="delete">
                                <DeleteIcon sx={{ color: 'white', "&:hover": { color: 'red' } }} onClick={handleDelete} />
                            </IconButton>
                        )}
                        <Button disabled={isSaveDisabled} variant="contained" color="success" onClick={handleSaveClick}>
                            Save
                        </Button>
                    </Box>
                </Box>

            </Modal>
            {
                selectedId !== null && (
                    <>
                        <EditNote id={selectedId} setData={setNoteData} />
                    </>
                )
            }
        </div >
    );

}

