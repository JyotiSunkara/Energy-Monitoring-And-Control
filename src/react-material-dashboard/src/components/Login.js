import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { login } from './UserFunctions'
// import { GoogleLogin } from 'react-google-login';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css'
import GoogleLogin from 'react-google-login';
import { register } from './UserFunctions'


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    // this.responseGoogle=this.responseGoogle.bind(this)
  }
  // prepareLoginButton = () => {
 
  //   console.log(this.refs.googleLoginBtn);
  //   console.log("HELLO")
  //   this.auth2.attachClickHandler(this.refs.googleLoginBtn, {},
  //       (googleUser) => {
  //       console.log("HELLO2")
  //       let profile = googleUser.getBasicProfile();
  //       // console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       // console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       // console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //       //YOUR CODE HERE
 
 
  //       }, (error) => {
  //           alert(JSON.stringify(error, undefined, 2));
  //       });
 
  // }
 
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    // console.log("SHIT SUBMIT")
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user)
    login(user).then(res => {
      console.log(res)
      if (res) {
        // this.props.history.push(`/profile`)
        if (res.error) {
          let name = this.state.errors
          name['failed'] = "* Either Email or password is wrong"
          this.setState({ errors: name })
          localStorage.removeItem('usertoken')
        }
        else {
          let name = this.state.errors
          name['failed'] = ""
          this.setState({ errors: name })
          this.props.history.push(`/dashboard`)
        }
      }
    })
  }

  signup(res) {

  const googleresponse = {
    Name: res.profileObj.name,
    email: res.profileObj.email,
  };
  var newlist=[]
  let name_array=googleresponse.Name.split(" ")
  const newUser = {
    first_name: name_array[0],
    last_name: name_array[1],
    email: googleresponse.email,
    password: "google",
    position: "space",
    lab: 0,
    floor: 1,
    list:[]
  }
  register(newUser)
  .then(()=>{
    const user = {
      email:newUser.email,
      password: "google"
    }
    console.log(user)
    login(user).then(res => {
      localStorage.setItem("google",1)
      console.log(res)
      if (res) {
        // this.props.history.push(`/profile`)
        if (res.error) {
          let name = this.state.errors
          name['failed'] = "* Either Email or password is wrong"
          this.setState({ errors: name })
          localStorage.removeItem('usertoken')
        }
        else {
          let name = this.state.errors
          name['failed'] = ""
          this.setState({ errors: name })
          this.props.history.push(`/dashboard`)
        }
      }
    })
  })
    
  console.log(googleresponse)
    
}   
  render(){
  const {classes} = this.props;
  const responseGoogle = (response) => {
    // console.log(response);
    var res = response.profileObj;
    // console.log(res);
    // debugger;
    this.signup(response);
    
  }
    
  const responsefailure= ()=>{
    console.log("FAILED !!!!")
  }
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
      
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.onChange}
            autoFocus
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
            value={this.state.password}
            onChange={this.onChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {this.state.errors['failed']}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
             
            </Grid>
            <Grid item>
            <GoogleLogin
               clientId="856248787583-jvj1h8m1nk8t8rvblsdnd4a310e106r1.apps.googleusercontent.com"
               buttonText="Login with Google"
                onSuccess={responseGoogle}
               onFailure={responsefailure} ></GoogleLogin>


              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
 
      </Box>
    </Container>
  );
  }
}
export default withStyles(useStyles)(Login)

//key=AIzaSyAEFt-d4KP5TLq8p-erMw5V5OSJOKCGa0Y
//client id=856248787583-gi1uunta6ma8g3auqok6mjgdpbnl04hq.apps.googleusercontent.com