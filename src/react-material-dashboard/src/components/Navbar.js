import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { decode } from 'punycode';
import 'bootstrap/dist/css/bootstrap.min.css';  
class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {
        const loginRegLink = (
            <ul className = "navbar-nav">
                <li className = "nav-item">
                    <Link to = "/login" className = "nav-link">
                        Login
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link to = "/register" className = "nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        let userLink = (
            <ul className = "navbar-nav">
                <li className = "nav-item">
                    <Link to = "/profile" className = "nav-link">
                        User
                    </Link>
                </li>
                <li className = "nav-item">
                <Link to = "/control" className = "nav-link">
                Control      
                </Link>
                </li>
                <li className = "nav-item">
                <Link to = "/data" className = "nav-link">
                Data
                </Link>
                </li>
                <li className = "nav-item">
                <Link to = "/password_reset" className = "nav-link">
                Setting
                </Link>
                </li>
                <li className = "nav-item">
                <Link to = "/view" className = "nav-link">
                View
                </Link>
                </li>
                <li className = "nav-item">
                    <a href = "" onClick = {this.logOut.bind(this)} className = "nav-link">
                        Logout
                    </a>
                </li>
                </ul>
        )
        if(localStorage.usertoken)
        {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            if(decoded.position=="admin")
            {
                userLink = (
                    <ul className = "navbar-nav">
                        <li className = "nav-item">
                            <Link to = "/profile" className = "nav-link">
                                User
                            </Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/control" className = "nav-link">
                        Control      
                        </Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/data" className = "nav-link">
                        Data
                        </Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/password_reset" className = "nav-link">
                        Setting
                        </Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/view" className = "nav-link">
                        View
                        </Link>
                        </li>
                        <li className = "nav-item">
                        <Link to = "/permission" className = "nav-link">
                        Permission
                        </Link>
                        </li>
                        <li className = "nav-item">
                            <a href = "" onClick = {this.logOut.bind(this)} className = "nav-link">
                                Logout
                            </a>
                        </li>
                        </ul>
                )
            }
            userLink=<></>
        }

        return (
            <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                <button className = "navbar-toggler"
                type = "button"
                data-toggle = "collapse"
                data-target = "#navbar1"
                aria-controls = "navbar1"
                aria-expanded = "false"
                aria-lable = "Toggle navigation">
                    <span className = "navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <ul className = "navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className = "nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
