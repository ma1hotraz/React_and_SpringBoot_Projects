
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { adminLogin } from '../api/AdminAPIs';
import { useNavigate } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";
import bgImage from '../images/bg.jpg';




const defaultTheme = createTheme();

export default function AdminLogin() {

    const [errorEmail, seterrorEmail] = useState(false);
    const [errorPassword, seterrorPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const navigate = useNavigate();


    async function handleLogin(data) {
        try {
            setLoading(true);
            setProgress(35);
            const userData = await adminLogin(data);
            if (userData) {
                setProgress(100);
                navigate("/admin/dashboard", toast.success("Login Successful"));
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        handleLogin(data);
    };


    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const handleInputChangeEmail = (event) => {
        seterrorEmail(validateEmail(event.target.value));
    }
    const handleInputChangePassword = (event) => {
        seterrorPassword(event.target.value);
    }

    const isSubmitDisabled = !(errorEmail && errorPassword.length >= 6);

    return (
        <Box sx={{
            position: 'relative',
            minHeight: '100vh',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: -1,
            overflowY: 'hidden'
        }}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: 'inherit',
                filter: 'blur(3px)',
                zIndex: -1,
            }} />
            <ThemeProvider theme={defaultTheme}>
                {isLoading ? <LoadingBar color="yellow" height={10} progress={progress} shadow={true} transitionTime={2000} waitingTime={1000} onLoaderFinished={() => setProgress(0)} /> : <></>}
                <div style={{ height: '50px' }}>

                </div>
                <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={errorEmail ? false : true}
                                helperText={errorEmail === false ? 'Invalid email address' : ''}
                                onChange={handleInputChangeEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={errorPassword.length < 6 ? true : false}
                                helperText={errorPassword.length < 6 ? 'Too Short Min. 6 ' : ''}
                                onChange={handleInputChangePassword}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitDisabled}
                                onClick={() => setLoading(true)}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" onClick={() => toast.warn('Password Reset Requested, Check Email', 1000)}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Box>
    );
}