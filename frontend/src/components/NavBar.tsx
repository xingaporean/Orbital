import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const apiURL = 'http://localhost:8000'

interface userWrapper {
  logged_in: boolean, 
  user: any
 }
 
type props = {
  user: userWrapper,
  handleLogout: () => void
}

const ButtonAppBar: React.FC<props> = ({user, handleLogout}) => {

  const classes = useStyles();

  const onLogout = () => {
    axios.delete(apiURL + '/api/v1/logout',{withCredentials:true})
    .then(response => {handleLogout()}).catch(error => console.log(error))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button 
            color="inherit"
            component={Link} 
            to={"/"}
            >
              Jobs
          </Button>
          <Button 
            color="inherit"
            component={Link}
            to={"/signup"}
            >
            NGO
          </Button>
          { !user.logged_in ? 
          <Button 
            color="inherit"
            component={Link}
            to={"/users/login"}
            >
            Login
          </Button> :
          <Button 
            color="inherit"
            component={Link} 
            to={"/"}
            onClick={onLogout}
            >
              Logout
          </Button> }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar
