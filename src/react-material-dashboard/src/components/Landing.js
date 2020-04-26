import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {

  LatestSales
} from './../views/Dashboard/components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
  }));
  
const Landing=()=>{
    const classes = useStyles();
   
        return (
            <div className = "container">
                <div className = "jumbotron mt-5">
                    <div className = "col-sm-8 mx-auto">
                        <h1 className="text-center">
                            KRB
                        </h1>
                    </div>
                </div>
                <div className={classes.root}>
                    <Grid
                        container
                        spacing={4}
                        justify="center"
                    >
                    
                       <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                       
                        >
                        <LatestSales />
                        </Grid>
                        
                    </Grid>
                </div>
            </div>

        )
}


export default Landing