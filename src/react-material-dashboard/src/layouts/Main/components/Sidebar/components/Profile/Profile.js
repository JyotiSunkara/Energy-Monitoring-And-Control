import React,{useState,useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import jwt_decode from 'jwt-decode'
  

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const user = {
  //   name: 'Shen Zhi',
  //   avatar: '/images/avatars/avatar_11.png',
  //   bio: 'Brain Director'
  // };
  const [user,setValues]= useState({name :'',avatar:'',email:'',position:''})
  useEffect(() => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded)
    setValues({...user,
      name: decoded.first_name+" "+decoded.last_name,
      email: decoded.email,
      position: decoded.position,
     
  })
    
  }, [])
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
      <Typography variant="body2">{user.position}</Typography>

    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
