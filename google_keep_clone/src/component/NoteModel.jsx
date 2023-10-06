// import React, { useState, useEffect } from 'react';
// import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditNote from '../api/EditNote';

// export default function NoteModal({
//     isOpen,
//     handleClose,
//     title,
//     description,
//     handleSaveNote,
//     handleDelete,
//     mode,
//     selectedId,
//     clearTitleAndDescription
// }) {
//     const [noteTitle, setNoteTitle] = useState('');
//     const [noteDescription, setNoteDescription] = useState('');
//     const [noteData, setNoteData] = useState([]);

//     useEffect(() => {
//         // setNoteTitle(title || '');
//         // setNoteDescription(description || '');
//         setNoteTitle(noteData.title || '');
//         setNoteDescription(noteData.description || '');
//         setNoteData([]);
//     }, [title, description]);


//     const handleTitleChange = (e) => {
//         setNoteTitle(e.target.value);
//     };

//     const handleDescriptionChange = (e) => {
//         setNoteDescription(e.target.value);
//     };

//     return (
//         <div>
//             <Modal
//                 open={isOpen}
//                 onClose={handleClose}
//                 aria-labelledby="modal-title"
//                 aria-describedby="modal-description"
//             >
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: 400,
//                         borderRadius: '12px',
//                         padding: '16px 32px 24px 32px',
//                         backgroundColor: '#FFFFFF',
//                         boxShadow: 16,
//                         justifyContent: 'space-between',
//                         display: 'block'
//                     }}
//                 >
//                     <h2 style={{ margin: '10px', padding: '6px' }} id="modal-title">
//                         {mode === 'create' ? 'Create Note' : 'Edit Note'}
//                     </h2>

//                     <TextField
//                         fullWidth
//                         label="Title"
//                         variant="outlined"
//                         value={noteTitle}
//                         onChange={handleTitleChange}
//                     />
//                     <div style={{ height: '20px' }}></div>
//                     <TextField
//                         fullWidth
//                         label="Description"
//                         variant="outlined"
//                         multiline
//                         rows={4}
//                         value={noteDescription}
//                         onChange={handleDescriptionChange}
//                     />
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             marginTop: '10px',
//                             marginBottom: '10px',
//                         }}
//                     >
//                         {mode === 'edit' && (
//                             <IconButton aria-label="delete">
//                                 <DeleteIcon sx={{ color: 'red' }} onClick={handleDelete} />
//                             </IconButton>
//                         )}
//                         <Button variant="contained" color="success" onClick={() => handleSaveNote(noteTitle, noteDescription)}>
//                             Save
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//             {selectedId !== null && (
//                 <>
//                     <EditNote id={selectedId} setData={setNoteData} />
//                 </>
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote from '../api/EditNote';

export default function NoteModal({
    isOpen,
    handleClose,
    title,
    description,
    handleSaveNote,
    handleDelete,
    mode,
    selectedId,
    clearTitleAndDescription
}) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteData, setNoteData] = useState([]);

    useEffect(() => {
        if (mode === 'edit') {
            setNoteTitle(noteData.title || '');
            setNoteDescription(noteData.description || '');
            setNoteData([]);
        } else {
            setNoteTitle('');
            setNoteDescription('');
            setNoteData([]);
        }
        setNoteData([]);
    }, [title, description, mode]);

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setNoteDescription(e.target.value);
    };

    const handleSaveClick = () => {
        handleSaveNote(noteTitle, noteDescription);
        clearTitleAndDescription();
    };

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
                        width: 400,
                        borderRadius: '12px',
                        padding: '16px 32px 24px 32px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: 16,
                        justifyContent: 'space-between',
                        display: 'block'
                    }}
                >
                    <h2 style={{ margin: '10px', padding: '6px' }} id="modal-title">
                        {mode === 'create' ? 'Create Note' : 'Edit Note'}
                    </h2>

                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={noteTitle}
                        onChange={handleTitleChange}
                    />
                    <div style={{ height: '20px' }}></div>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={noteDescription}
                        onChange={handleDescriptionChange}
                    />
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
                                <DeleteIcon sx={{ color: 'red' }} onClick={handleDelete} />
                            </IconButton>
                        )}
                        <Button variant="contained" color="success" onClick={handleSaveClick}>
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

