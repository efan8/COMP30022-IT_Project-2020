/* Initial page users will see that will take them to login or signup */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../Auth/auth';

class LandingPage extends React.Component {

    constructor() {
        super();
        this.state ={
            name: ""
        };
    };

    //To change page using buttons
    logChange() {
        window.location = "/Login";
    }
    signChange() {
        window.location = "/SignUp";
    }
    logoutPressed() {
        logout().then(() => {
            console.log("Logged out");
        });
    }

    render() {
        return(
            <div>
                <h1 className="title">Landing Page</h1>
                <button onClick={this.logChange}>Login</button>
                <br></br>
                <button onClick={this.signChange}>Sign Up</button>
                <br></br>
                <button onClick={this.logoutPressed}>Logout</button>
            </div>
        );
    };
};

export default LandingPage;
