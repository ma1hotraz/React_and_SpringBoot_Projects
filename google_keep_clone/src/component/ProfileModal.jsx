import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Badge, Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { updateData } from '../api/UpdateUser';
import ImageDisplay from './ImageDisplay';
import { serverStatus } from '../api/AdminAPIs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ProfileModal() {

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [source, setSource] = useState(null);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isServerUp, setIsServerUp] = useState('error');
    const [avtarCol, setAvatarCol] = useState('');


    const dataS = JSON.parse(localStorage.getItem('userData'));
    const imageData = dataS.image;


    const getStatus = async () => {
        try {
            const serverResponse = await serverStatus();
            if (serverResponse) {
                setIsServerUp('success');
            } else {
                setIsServerUp('error');
            }
        } catch (error) {
            setIsServerUp(false);
        }
    };

    useEffect(() => {
        getStatus();
        const avtrCol = localStorage.getItem('avtarCol');
        setAvatarCol(avtrCol.substring(1, 8));
    }, []);

    const fileInputRef = useRef(null);

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
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        const user = {
            name: name,
            email: email,
            file: selectedFile,
        };

        try {
            const response = await updateData(user);
            updateProfileImage(response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const updateProfileImage = (newImageSource) => {
        setSource(newImageSource);
    };

    const toggleImageVisibility = () => {
        setIsImageVisible(!isImageVisible);
    };

    const handleLogout = () => {
        navigate('/', toast.success('Logout Successful'));
        sessionStorage.clear();
        localStorage.clear();
    };

    const { name, email } = JSON.parse(localStorage.getItem('userData'));

    const fadeDuration = '1.0s';

    return (
        <Box>
            <Tooltip title={'Profile'}>
                <Button onClick={handleClick}>
                    {imageData !== null ? (
                        <Badge
                            color={`${isServerUp}`}
                            overlap="circular"
                            size="large"
                            variant="dot"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Avatar sx={{
                                backgroundColor: avtarCol,
                                border: `2px solid ${isServerUp === 'error' ? 'red' : 'green'}`
                            }}>
                                <ImageDisplay />
                            </Avatar>
                        </Badge>
                    ) : (
                        <Badge
                            color={`${isServerUp}`}
                            overlap="circular"
                            size="large"
                            variant="dot"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Avatar sx={{
                                backgroundColor: avtarCol,
                                border: `2px solid ${isServerUp === 'error' ? 'red' : 'green'}`
                            }}>
                                {name.charAt(0)}
                            </Avatar>
                        </Badge>
                    )}
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
                            width: 300,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '20px',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                sx={{
                                    height: '108px', width: '108px', backgroundColor: `${avtarCol}`,
                                    border: `2px solid ${isServerUp === 'error' ? 'red' : 'green'}`
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {isHovered ? (
                                    <Box onClick={handleImage}>
                                        <input
                                            type="file"
                                            id="imgupload"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            onClick={toggleImageVisibility}
                                        />
                                        <FontAwesomeIcon icon={faCamera} />
                                    </Box>
                                ) : (
                                    (!imageData === null || !imageData) ? (
                                        <Avatar
                                            sx={{
                                                transition: `opacity ${fadeDuration}`,
                                                opacity: !isImageVisible ? 1 : 0,
                                                backgroundColor: `${avtarCol}`,
                                                border: `2px solid ${isServerUp === 'error' ? 'red' : 'green'}`
                                            }}
                                        >
                                            <Typography variant='h5'>{name.charAt(0)}</Typography>
                                        </Avatar>
                                    ) : (
                                        <Avatar sx={{ height: '108px', width: '108px', border: `2px solid ${isServerUp === 'error' ? 'red' : 'green'}` }}>
                                            <ImageDisplay />
                                        </Avatar>
                                    )
                                )}
                            </Avatar>
                        </Box>
                        <Box sx={{ margin: '20px 0 20px 0' }}>
                            <Typography variant="h6" component="div" sx={{ fontFamily: "'Inconsolata', monospace", }}>
                                User Profile
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Inconsolata', monospace", }}>
                                Name: {name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "'Inconsolata', monospace", }}>
                                Email: {email}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="contained" color="error" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Tooltip>
        </Box>
    );
}
