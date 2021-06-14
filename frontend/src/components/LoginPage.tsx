import React from 'react';
import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import axios from 'axios';

const apiURL = 'http://localhost:8000'

interface userWrapper {
  logged_in: boolean, 
  user: any
 }

type Props = {
  handleLogin: (data: userWrapper) => void,
  handleLogout: () => void
}

const LoginPage: React.FC<Props> = ({handleLogin, handleLogout}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    let user = {
      email: email,
      password: password
    }
    axios.post(apiURL + '/api/v1/login', {user}, {withCredentials: true})
    .then(response => {
      console.log('axios post has run handleSubmit')
      if (response.data.logged_in) {
        let temp = {...response.data}
        console.log('this is logged in')
        console.log(temp)
        handleLogin(temp)
      } else {
        console.log('this has logged out')
        
      }
    }).catch(error => console.log('api errors', error))
  }

  useEffect(() => {
    console.log('useEffect')
    console.log(email)
    console.log(password)
  })

  return (
    <Box m="auto" paddingTop={20} paddingBottom={20}>
      <Container maxWidth="sm">
      <Paper elevation={2}>
        <Box m="auto" paddingTop={10} paddingBottom={10}>
            <Grid
              container
              justify="center"
              alignContent="center"
            > 
              <Grid item xs={10}>
                <Typography 
                  component="h1" 
                  variant="h5"
                  align="center"
                  >
                  Log In
                </Typography>
                <form noValidate onSubmit={e => handleSubmit(e)}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => {setEmail(e.target.value);}}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => {setPassword(e.target.value);}}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Log In
                  </Button>
                  <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                </form>
              </Grid>      
            </Grid>
        </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage