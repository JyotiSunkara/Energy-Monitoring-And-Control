import React, { Component } from 'react';

class Navbar extends Component {
    state = {}
    render() {
        return (<nav class="navbar-left navbar-dark bg-dark ml-auto">
            <a class="navbar-brand" href="/home">Home</a>
            <a class="navbar-brand" href="/control">Control</a>
            <a class="navbar-brand" href="/data">Data</a>
            <a class="navbar-brand" href="/profile">Profile</a>
        </nav>);
    }
}

export default Navbar;