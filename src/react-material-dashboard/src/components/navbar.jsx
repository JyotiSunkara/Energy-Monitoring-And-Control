import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';


class NavBar extends Component {
    state = {}
    render() {
        return (

            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/control">Control</Nav.Link>
                        <Nav.Link href="/data">Data</Nav.Link>
                        <Nav.Link href="/password_reset">Setting</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>



        );

    }
}

export default NavBar;