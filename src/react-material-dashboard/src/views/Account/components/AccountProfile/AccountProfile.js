import React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import jwt_decode from 'jwt-decode'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [user, setValues] = useState({
    name: '',
    email: '',
    position: '',
    avatar:''
});
  useEffect(() => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded)
    
    setValues({...user,
      name: decoded.first_name+" "+decoded.last_name,
      email: decoded.email,
      position: decoded.position,
     
  })}, []);
  console.log(user.name)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.email}, {user.position}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} 
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        {/*<div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
  </div>*/}
      </CardContent>
      <Divider />
      {/*<CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>*/}
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
