import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
// import NavBar from './components/navbar'

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import {  Route } from 'react-router-dom'
import './App.css';

//Started adding
//import NavBar from './components/navbar'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    console.log(browserHistory)
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
        <div className="App">
        <Navbar />
        <Route  path="/" exact component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
         
          

        </div>
         
      </div>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
