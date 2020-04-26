import React, {useState,useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Profile, SidebarNav, UpgradePlan } from './components';
import jwt_decode from 'jwt-decode'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));


const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();
  const [user,setValue]=useState("admin")
  useEffect(() => {
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  setValue(decoded.position)
  }, []);
let pages=[]
console.log(user)
  if(user=="admin"){
   pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Control AC',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      title: 'View',
      href: '/products',
      icon: <ShoppingBasketIcon />
},
    {
      title: 'User Request',
      href: '/icons',
      icon: <ImageIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    
    
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];
}
else if(user=="space"){
  if(localStorage.getItem("google")==1)
  {
    pages = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
      },
      {
        title: 'Control AC',
        href: '/typography',
        icon: <TextFieldsIcon />
      },
    
      {
           title: 'View',
           href: '/products',
           icon: <ShoppingBasketIcon />
     },
    
      {
        title: 'Account',
        href: '/account',
        icon: <AccountBoxIcon />
      },
     
    ]
  }
  else{
    pages = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
      },
      {
        title: 'Control AC',
        href: '/typography',
        icon: <TextFieldsIcon />
      },
      {
        title: 'View',
        href: '/products',
        icon: <ShoppingBasketIcon />
  },
      
    
      {
        title: 'Account',
        href: '/account',
        icon: <AccountBoxIcon />
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: <SettingsIcon />
      }
    ]
  }
}
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <UpgradePlan />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;

// {
//   title: 'Dashboard',
//   href: '/dashboard',
//   icon: <DashboardIcon />
// },
// {
//   title: 'Control AC',
//   href: '/typography',
//   icon: <TextFieldsIcon />
// },
// {
//   title: 'User Request',
//   href: '/icons',
//   icon: <ImageIcon />
// },
// {
//   title: 'Users',
//   href: '/users',
//   icon: <PeopleIcon />
// },
// {
//   title: 'View',
//   href: '/products',
//   icon: <ShoppingBasketIcon />
// },
// {
//   title: 'Authentication',
//   href: '/sign-in',
//   icon: <LockOpenIcon />
// },
// {
//   title: 'Account',
//   href: '/account',
//   icon: <AccountBoxIcon />
// },
// {
//   title: 'Settings',
//   href: '/settings',
//   icon: <SettingsIcon />
// }
