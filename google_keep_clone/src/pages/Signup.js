import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Signup } from '../api/SignupUser'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const defaultTheme = createTheme();

export default function SignIn() {

  const [errorFirstName, seterrorFirstName] = React.useState(false);
  const [errorLastName, seterrorLastName] = React.useState(false);
  const [errorEmail, seterrorEmail] = React.useState(false);
  const [errorPassword, seterrorPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSignup(data);
  };


  async function handleSignup(data) {
    try {
      const userData = await Signup(data);
      if (userData) {
        navigate("/home", toast.success("Login Successful"))
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const handleInputChangeFirstName = (event) => {
    seterrorFirstName(event.target.value);
  };
  const handleInputChangeLastName = (event) => {
    seterrorLastName(event.target.value);
  };
  const handleInputChangeEmail = (event) => {
    seterrorEmail(validateEmail(event.target.value));
  }
  const handleInputChangePassword = (event) => {
    seterrorPassword(event.target.value);
  }

  const isSubmitDisabled = !(
    errorFirstName &&
    errorLastName &&
    errorEmail &&
    errorPassword.length >= 6 ? true : false
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                error={errorFirstName.length <= 4 ? true : false}
                helperText={errorFirstName.length <= 4 ? 'Too Short' : ''}
                onChange={handleInputChangeFirstName}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                error={errorLastName.length <= 4 ? true : false}
                helperText={errorLastName.length <= 4 ? 'Too Short' : ''}
                onChange={handleInputChangeLastName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="Forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Signin" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
