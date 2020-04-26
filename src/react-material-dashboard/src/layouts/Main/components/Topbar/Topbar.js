import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { Switch, Redirect,useHistory ,Route} from 'react-router-dom';
// import { useHistory } from "history";
// const history = useHistory();

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  // let shit=0
  const [notifications] = useState([]);
  const [shit,setshit]=useState(0);
  let logOut = (e) => {
    // console.log(history)
    console.log("SHIT")
    console.log(e)
    console.log(props)
    e.preventDefault()
    localStorage.removeItem('usertoken')
    localStorage.removeItem("google")
    setshit(1)
    // history.go("/")
  }

  if(shit==1)
  {
    console.log("HELLO")
    return(
    <Redirect push to="/"></Redirect>
    );
  }                       
  else{                                                                                                                                                                                                                                                                                                                                                   
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >                                                 
      <Toolbar>
        
          
        <b>KRB</b>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
            
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={logOut}
          >
            <InputIcon  />
          </IconButton>
        </Hidden>
      
        <Hidden lgUp>
          <IconButton
            color="inherit"
           
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );}
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
