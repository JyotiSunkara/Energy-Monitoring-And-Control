import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    previous:'',
    password: '',
    confirm: ''
  });
  const [errors,seterrors]=useState({
    passworderror:''
  });
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePassword = event => {
    if(values.password==values.confirm)
    {
      console.log("GOOD PASSWORD")
      seterrors({
        ...errors,
        ['passworderror']:''
      })
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      console.log(decoded.email)
      var reset={
        email:decoded.email,
        password:values.password,
        previous:values.previous
      }
      console.log("PASSWORD")
      console.log(decoded)
      axios.post('http://localhost:5000/users/passwordupdate',reset)
      .then(res=>{
        // console.log(res)
        seterrors({
          ...errors,
          ['passworderror']:res.data
        })
      })
    }
    else
    {
      seterrors({
        ...errors,
        ['passworderror']:'*Entered password are not same'
      })
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
        
          <TextField
            fullWidth
            label="Old Password"
            name="previous"
            onChange={handleChange}
            type="password"
            value={values.previous}
            variant="outlined"
          />
          <br/>
          <br/>
          <TextField
            fullWidth
            label="New Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Confirm New password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        
        <Divider />
        <CardActions>
          <Button onClick={handlePassword}
            color="primary"
            variant="outlined"
          >
            Update
          </Button>
          
        </CardActions>
      
          {errors.passworderror}
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
