import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';

import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        <Link color="inherit" href="/">
            KIMOS
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const theme = createTheme({
    palette:{
        primary:red,
        secondary:blue
    }
});

export default function SignUp() {

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(`http://localhost:3000/users/signup`,{
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
    })
    .then(res=>{
        if(res.ok){
            setFeedbackMsg("Thanks for signing up.");
            setSeverity('success');
        }else{
            setFeedbackMsg("Couldn't Signup please try again.");
            setSeverity('error');
        }
        setOpen(true);
    })
    .catch(e=>{
        console.log(e.error);
    })
  };

  const [open, setOpen] = useState(false);
  const [severity,setSeverity] = useState("");
  const [feedbackMsg,setFeedbackMsg] = useState("");

  



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    
    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {feedbackMsg}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { <Typography component="h1" align="center">
             Learn without limits and at your own pace.
          </Typography> }
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  className='signup__textField'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="secondary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
                className='signup__Btn'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-centre">
              <Grid item>
                <Link href="/login" variant="body2" color="secondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}