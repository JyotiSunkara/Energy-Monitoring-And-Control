import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Card,Button,Form,Modal,ButtonToolbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      <Card style={{ width: '30rem' }}>
                <Card.Body>
                    
                    <Card.Subtitle className="mb-2 text-muted">AC_NAME Stat</Card.Subtitle>
                    <Card.Text>
                    AC Temperature : 26 C
                    <br/>
                    AC Status : ON

                    </Card.Text>
                   
                    <>  </>
                    
                    </Card.Body>
                </Card>
    </div>
  );
};

export default ProductList;
