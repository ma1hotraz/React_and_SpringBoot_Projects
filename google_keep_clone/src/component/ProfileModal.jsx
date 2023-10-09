// import React, { useState, useEffect } from 'react';
// import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';

// export default function ProfileModal() {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const storedData = sessionStorage.getItem('userData');
//     const data = JSON.parse(storedData);

//     const name = data.name;
//     const email = data.email;

//     useEffect(() => {
//         setIsHovered(false);
//     }, []);

//     const handleClick = () => {
//         setModalOpen(true);
//     };

//     const handleClose = () => {
//         setModalOpen(false);
//     };

//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };

//     const handleImage = () => {

//     }

//     return (
//         <Box>
//             <Button onClick={handleClick}>
//                 <Avatar>{name.charAt(0)}</Avatar>
//             </Button>
//             <Modal
//                 open={modalOpen}
//                 onClose={handleClose}
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         width: 400,
//                         bgcolor: 'background.paper',
//                         border: '2px solid #000',
//                         boxShadow: 24,
//                         p: 4,
//                         borderRadius: '20px'
//                     }}
//                 >
//                     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                         <Avatar
//                             sx={{ height: '108px', width: '108px' }}
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             {isHovered ?
//                                 <Box onClick={handleImage}>
//                                     <input type="file" id="imgupload" />
//                                     <FontAwesomeIcon icon={faCamera} />
//                                 </Box>
//                                 :
//                                 <h1>{name.charAt(0)}</h1>}
//                         </Avatar>
//                     </Box>
//                     <Box sx={{ margin: '20px 0 20px 0' }}>
//                         <Typography variant="h6" component="div">
//                             User Profile
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Name: {name}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Email: {email}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }} >
//                         <Button variant='contained' onClick={handleClose}>Close</Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// }
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function ProfileModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const storedData = sessionStorage.getItem('userData');
    const data = JSON.parse(storedData);

    const name = data.name;
    const email = data.email;

    const fileInputRef = useRef(null); // Create a ref for the file input

    useEffect(() => {
        setIsHovered(false);
    }, []);

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleImage = () => {
        // Trigger the click event on the file input when the user clicks the avatar
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event) => {
        // Handle the file change event here (e.g., upload the selected image)
        const selectedFile = event.target.files[0];
        // You can add code here to upload the selectedFile to your server or process it as needed
        console.log('Selected file:', selectedFile);
    }

    return (
        <Box>
            <Button onClick={handleClick}>
                <Avatar>{name.charAt(0)}</Avatar>
            </Button>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '20px'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            sx={{ height: '108px', width: '108px' }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isHovered ? (
                                <Box onClick={handleImage}>
                                    <input
                                        type="file"
                                        id="imgupload"
                                        ref={fileInputRef} // Assign the ref to the file input
                                        style={{ display: 'none' }} // Hide the file input
                                        onChange={handleFileChange} // Handle file change event
                                    />
                                    <FontAwesomeIcon icon={faCamera} />
                                </Box>
                            ) : (
                                <h1>{name.charAt(0)}</h1>
                            )}
                        </Avatar>
                    </Box>
                    <Box sx={{ margin: '20px 0 20px 0' }}>
                        <Typography variant="h6" component="div">
                            User Profile
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Name: {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {email}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }} >
                        <Button variant='contained' onClick={handleClose}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
