import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, IconButton, InputBase, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '../api/EditNote';
import getText from '../utils/TextUtils';
import ContentLoader from 'react-content-loader'

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
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteData, setNoteData] = useState([]);
    const [modalBg, setModalBg] = useState(null);

    const isSaveDisabled = !noteTitle.trim() || !noteDescription.trim();

    const Notes_Data_Loader = () => (
        <ContentLoader
            speed={2}
            height={180}
            backgroundColor={"grey"}
            foregroundColor={"lightgrey"}
        >
            <rect x="0" y="0" rx="10" ry="10" width="200" height="40" />
            <rect x="0" y="50" rx="10" ry="10" width="200" height="100" />
        </ContentLoader>
    );

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

    if(noteTitle && noteDescription)

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
                    {(noteData === undefined && mode === 'edit') || (noteData.length === 0 && mode === 'edit') ?
                        <Notes_Data_Loader /> :
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
                        </>}
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
                                <DeleteIcon sx={{ color: 'white' }} onClick={handleDelete} />
                            </IconButton>
                        )}
                        <Button disabled={isSaveDisabled} variant="contained" color="success" onClick={handleSaveClick}>
                            Save
                        </Button>
                    </Box>
                </Box>

            </Modal>
            {selectedId !== null && (
                <>
                    <EditNote id={selectedId} setData={setNoteData} />
                </>
            )}
        </div>
    );

}

