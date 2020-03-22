import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { render } from '@testing-library/react';
import { register } from './UserFunctions'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


var lablist
var floorlist
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      position: '',
      floor: -1,
      lab: 'ALL LABS',
      list:[],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    
  }
  onChange(e) {
    console.log(e.target.name+" "+e.target.value)
    if(e.target.value=="admin")
    {
      this.setState({floor:-1})
    }
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    var newlist=[]
    
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      position: this.state.position,
      lab: this.state.lab,
      floor: this.state.floor,
      list:newlist
    }
    console.log(newUser)
    register(newUser).then(res => {

      this.props.history.push(`/login`)
    })
  }

  render(){
  const {classes} = this.props;
  console.log("position"    )
    console.log(this.state.position)
    console.log(this.state.floor)
    if(this.state.floor==0)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={this.state.lab}
        onChange={this.onChange}
      >
      <MenuItem value="0">Office and Faculty Meeting Hall</MenuItem>
      <MenuItem value="1">Exhibition Hall</MenuItem>
        
      </Select>
    </div>
    }
    else if(this.state.floor==1)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={this.state.lab}
        onChange={this.onChange}
      >
      <MenuItem value="0">WING - I</MenuItem>
      <MenuItem value="1">WING - II</MenuItem>
      <MenuItem value="2">WING - III</MenuItem>
      <MenuItem value="3">WING - IV</MenuItem>
        
      </Select>
    </div>
    }
    else if(this.state.floor==2)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={this.state.lab}
          onChange={this.onChange}
        >
        <MenuItem value="0">WING - I</MenuItem>
        <MenuItem value="1">WING - II</MenuItem>
        <MenuItem value="2">WING - III</MenuItem>
        <MenuItem value="3">WING - IV</MenuItem>
        </Select>
      </div> 
    }
    
    else if(this.state.floor==3)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={this.state.lab}
          onChange={this.onChange}
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

    if(this.state.position=="space")
    {
      console.log("position scond")
      console.log(this.state.position)
      floorlist=
      <div className="form-group">
      <label htmlFor="floor">Floor</label>
      <Select
        type="floor"
        className="form-control"
        name="floor"
        placeholder="Choose Floor"
        value={this.state.floor}
        onChange={this.onChange}
      >
        <MenuItem value="0">Ground Floor</MenuItem>
        <MenuItem value="1">1st Floor</MenuItem>
        <MenuItem value="2">2nd Floor</MenuItem>
        <MenuItem value="3">3rd Floor</MenuItem>
      </Select>
    </div>
    }
    else{
      floorlist=
      <div></div>
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={this.state.first_name}
                onChange={this.onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                value={this.state.last_name}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
            <label htmlFor="position">Position</label>
            <Select
              type="text"
              className="form-control"
              name="position"
              placeholder="Choose Position"
              value={this.state.position}
              onChange={this.onChange}
               >
              <MenuItem value="space">Space User</MenuItem>
              <MenuItem value="admin">Admin </MenuItem>
            </Select>
            </Grid>
            <Grid item xs={12}>
            {floorlist}
            </Grid>
            <Grid item xs={12}>
            {lablist}
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>
  );}
}
export default withStyles(useStyles)(Register)
