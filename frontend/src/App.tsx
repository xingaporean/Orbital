import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar'
import SignupPage from './components/SignupPage'
import TempPage from './components/TempPage'
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import JobIndex from './components/JobIndex'
import JobView from './components/JobView'
import CreateJob from './components/CreateJob';


const apiURL = 'http://localhost:8000'

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F3F2EF"
    }
  }
})

interface testWrapper {
  item: { id: number, email: string, created_at: string, updated_at: string, password_digest: string }[]
}

interface userWrapper {
 logged_in: boolean, 
 user: any
}

const App: React.FC = () => {
  const [test,setTests] = useState<testWrapper | undefined>(undefined);
  // bug with default user, when i change page it will default back to this default, the child change does not persist for some
  // reason. Error is because i did not use loginstatus in use effect

  // current bug unauthenticated in notauthenticated is shown even when logged in is true is due to the default state
  const [user, setUsers] = useState<userWrapper>({logged_in: false, user: {} });

  const getTests = () => {
    axios.get(apiURL + "/api/v1/users").then(response => {
      setTests(response.data);
    }).catch(error => console.log(error))
  }

  const handleLogin = (data: userWrapper )=> {
    setUsers(data)
  }

  const handleLogout = () => {
    setUsers({logged_in: false, user: {} })
  }

  const getLoginStatus = () => {
    axios.get(apiURL + "/api/v1/logged_in",{
      withCredentials: true
    })
    .then(response => {
      if (response.data.logged_in) {
        handleLogin({logged_in: true, user: response.data.user})
      } else {
        handleLogout()
      }
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getTests();
    getLoginStatus()
  }, [])

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar user={user} handleLogout={handleLogout}/>
        <Switch>
          { user.logged_in ?
          <Route exact path="/authenticated"> 
            <TempPage name={'authenticated'} user={user} />
          </Route>
          : 
          <Route exact path="/notauthenticated">
            <TempPage name={'unauthenticafdsfdsfsdted'} user={user}/>
          </Route>
          }
          <Route exact path="/users/login">
            <LoginPage handleLogin={handleLogin} handleLogout={handleLogout} />
          </Route>
          <Route exact path="/studentsignup" component={SignupPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/" component={JobIndex}/>
          <Route exact path="/jobs" component={JobIndex}/>
          <Route exact path="/jobs/new" component={CreateJob}/>
          <Route exact path="/jobs/:id" component={JobView}/>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
