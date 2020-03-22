import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './profile.css';

class Profile extends Component {
    state = {}
    render() {
        return (
            <div>
                <h2 class="h2">Change Profile Settings</h2>
                <br></br>
                <form class="form">
                    <TextField label="Old Password" style={{width: 500}} type="password"/>
                    <br></br>
                    <TextField label="New Password" style={{width: 500}} type="password"/>
                    <br></br>
                    <TextField label="Confirm New Password" style={{width: 500}} type="password"/>
                    <br></br><br></br>
                    <Button variant="outlined" color="primary">Change Settings</Button>
                </form>
            </div>
        );
    }
}

export default Profile;