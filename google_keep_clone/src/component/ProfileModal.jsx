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
    const [avatarCol, setAvatarCol] = useState('grey');

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
    }, []);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchImage = () => {
            try {
                const dataS = sessionStorage.getItem('userData');
                const imageData = JSON.parse(dataS);

                if (!imageData || !imageData.image) {
                    console.error('Image data not found in sessionStorage');
                    return;
                }

                const byteArray = new Uint8Array(atob(imageData.image).split('').map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'image/png' });
                const dataUrl = URL.createObjectURL(blob);

                setSource(dataUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        const storedData = localStorage.getItem('avtarCol');
        setAvatarCol(storedData.substring(1,8) || 'grey');

        fetchImage();
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
    };

    const { name, email } = JSON.parse(sessionStorage.getItem('userData'));

    const fadeDuration = '1.0s';

    return (
        <Box>
            <Tooltip title={'Profile'}>
                <Button onClick={handleClick}>
                    {source !== null ? (
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
                            <Avatar sx={{ backgroundColor: avatarCol }}>
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
                            <Avatar sx={{ backgroundColor: avatarCol }}>{name.charAt(0)}</Avatar>
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
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '20px',
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
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            onClick={toggleImageVisibility}
                                        />
                                        <FontAwesomeIcon icon={faCamera} />
                                    </Box>
                                ) : (
                                    (source === null || !source) ? (
                                        <Avatar
                                            sx={{
                                                transition: `opacity ${fadeDuration}`,
                                                opacity: isImageVisible ? 1 : 0,
                                            }}
                                        >
                                            {name.charAt(0)}
                                        </Avatar>
                                    ) : (
                                        <Avatar sx={{ height: '108px', width: '108px' }}>
                                            <ImageDisplay />
                                        </Avatar>
                                    )
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
