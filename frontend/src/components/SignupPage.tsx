import React, {useState} from 'react';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import axios from 'axios';

const apiURL = 'http://localhost:8000'

interface userType {
  email: string,
  password: string
}

const SignupPage: React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, setUser] = useState<userType | undefined>(undefined)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    let user = {
      email: email,
      password: password
    }

    axios.post(apiURL + '/api/v1/users', {user}, {withCredentials: true})
    .then(response => {
      console.log(response)
      // need to handle signup 201 success what to do and 422 error
    }).catch(error => console.log('api errors', error))
  }



  return (
    <Box m="auto" paddingTop={20} paddingBottom={20}>
      <Container maxWidth="sm">
        <Paper elevation={1}>
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
                  Sign Up
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
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Already have an Account? Sign in Here"}
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

export default SignupPage