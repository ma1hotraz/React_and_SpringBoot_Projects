import React, { useState, useEffect } from 'react';
import { getByTitle } from '../api/SearchNote';
import { Box, Container, Grid, Paper, TextField, Typography, InputAdornment } from '@mui/material';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import notfound from '../images/notfound.gif';

export default function SearchBox() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSearchClick = async () => {
        try {
            const fetchedData = await getByTitle(userId, inputText);
            setData(fetchedData);
            setIsLoading(false);

            sessionStorage.setItem('query', inputText);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);
    const userId = user?.userId;

    useEffect(() => {
        const storedData = sessionStorage.getItem('query');
        let query = '';

        try {
            const parsedData = JSON.parse(storedData);
            if (typeof parsedData === 'string') {
                query = parsedData; 
            }
        } catch (error) {
            console.error('Error parsing stored data:', error);
        }

        setInputText(query);

        if (query) {
            handleSearchClick();
            sessionStorage.clear();
        }
    }, [userId]);

    return (
        <div>
            <div style={{ marginTop: '50px', padding: '10px' }}>
                <Container
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '2px solid green',
                        maxWidth: '50%',
                        padding: '10px',
                        borderRadius: '10px',
                    }}
                >
                    <TextField
                        style={{ backgroundColor: 'white', borderRadius: '10px' }}
                        placeholder='Search'
                        variant="filled"
                        size='small'
                        type='text'
                        fullWidth
                        value={inputText}
                        onChange={handleInputChange}
                        inputProps={{ style: { fontSize: '16px' } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        size='2x'
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleSearchClick}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Container>
                {isLoading ? (
                    <div></div>
                ) : data.length !== 0 ? (
                    <>
                        <h1>Notes with title : {inputText}</h1>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
                                {data.map((item) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.noteId}>
                                            <Box sx={{ height: '200px', width: '300px' }} key={item.noteId}>
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
                        </div>
                    </>) : (
                    <Box >
                        <img src={notfound} style={{ opacity: 0.5 }} alt="Transparent Image" />
                    </Box>
                )}
            </div>
        </div>
    );
}
