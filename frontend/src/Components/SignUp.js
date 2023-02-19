import React,{useState,useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as Link1 } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
import { useAuth } from './contexts/AuthContext';
import { Alert } from "react-bootstrap"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link1 color="inherit" to='/'>
        Pioneers
      </Link1>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const emailRef=useRef();
  const passwordRef=useRef();
  const passwordConfirmRef=useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const { signup } = useAuth()
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    // try {
    //   setError("")
    //   setLoading(true)
    //   signup(emailRef.current.value, passwordRef.current.value)
    // } catch {
    //   setError("Failed to create an account")
    // }

    // setLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      {error && <Alert variant="danger">{error}</Alert>}
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
            Sign up
          </Typography>
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
                  value={firstName}
                  onChange={(e) =>setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) =>setLastName(e.target.value)}
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
                  ref={emailRef}
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
                  ref={passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm-Password"
                  type="password"
                  id="password"
                  autoComplete="confirm-new-password"
                  ref={passwordConfirmRef}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link1 href="#" variant="body2" to="/Login">
                  Already have an account? Sign in
                </Link1>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}