import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode'

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  root: {}
}));

var lablist
var floorlist
var usertype
var save_details
const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      floor: '',
      lab: '',
  });
  const onChange =event=>
  {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }
  const handleChange = event => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value
    // });
  };
  const onSave =()=>
  {
    const info={
      email:values.email,
      floor:values.floor,
      lab:values.lab

    }
    axios.post('http://localhost:5000/users/save',info)
    .then(res=>{
      // console.log(res)
      console.log("SAVED DETAILS")
      
    })
    .catch((err)=>
    {
      console.log(err)
    })

  }

  if(values.position=="space")
  {
      // console.log("position scond")
      // console.log(this.state.position)
      floorlist=
      <div className="form-group">
      <label htmlFor="floor">Floor</label>
      <Select
        type="floor"
        className="form-control"
        name="floor"
        placeholder="Choose Floor"
        value={values.floor}
        onChange={onChange}
      >
        <MenuItem value="0">Ground Floor</MenuItem>
        <MenuItem value="1">1st Floor</MenuItem>
        <MenuItem value="2">2nd Floor</MenuItem>
        <MenuItem value="3">3rd Floor</MenuItem>
      </Select>
    </div>
  }
  else
  {
    floorlist=
    <TextField
    fullWidth
    label="Floor"
    margin="dense"
    name="floor"
    onChange={handleChange}
    type="text"
    value={values.floor}
    variant="outlined"
  />
  }
  if(values.position=="space")
  {
    if(values.floor==0)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={values.lab}
        onChange={onChange}
      >
      <MenuItem value="0">Office and Faculty Meeting Hall</MenuItem>
      <MenuItem value="1">Exhibition Hall</MenuItem>
        
      </Select>
    </div>
    }
    else if(values.floor==1)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={values.lab}
        onChange={onChange}
      >
      <MenuItem value="0">WING - I</MenuItem>
      <MenuItem value="1">WING - II</MenuItem>
      <MenuItem value="2">WING - III</MenuItem>
      <MenuItem value="3">WING - IV</MenuItem>
        
      </Select>
    </div>
    }
    else if(values.floor==2)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={values.lab}
          onChange={onChange}
        >
        <MenuItem value="0">WING - I</MenuItem>
        <MenuItem value="1">WING - II</MenuItem>
        <MenuItem value="2">WING - III</MenuItem>
        <MenuItem value="3">WING - IV</MenuItem>
        </Select>
      </div> 
    }
    
    else if(values.floor==3)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={values.lab}
          onChange={onChange}
        >
        <MenuItem value="0">WING - I</MenuItem>
        <MenuItem value="1">WING - II</MenuItem>
        <MenuItem value="2">WING - III</MenuItem>
        <MenuItem value="3">WING - IV</MenuItem>
        </Select>
      </div> 
    }
    else 
    {
        lablist=
        <></> 
    }
  }
  else
  {
    lablist=<TextField
    fullWidth
    label="Lab"
    margin="dense"
    name="Lab"
    onChange={handleChange}
    type="text"
    value={values.lab}
    variant="outlined"
  />
  }
  if(values.position=="space")
  {
    save_details=
    <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={onSave}
          >
            Save details
          </Button>
        </CardActions>

  }
  else{
    save_details=
    <></>
  }
  
  useEffect(() => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded)
    
    if(decoded.floor=="-1")
    {
      decoded.floor="EVERY FLOOR"
    }
    setValues({...values,first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      position: decoded.position,
      floor: decoded.floor,
      lab: decoded.lab
})}, []);
  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];
  console.log(values)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="last_name"
                onChange={handleChange}
                required
                value={values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Position"
                margin="dense"
                name="position"
                onChange={handleChange}
                type="text"
                value={values.position}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {floorlist}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {lablist}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/*<CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>*/}
        {save_details}
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
