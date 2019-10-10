/* Initial page users will see that will take them to login or signup */

import React from 'react';
import { check_login_status } from '../Auth/auth';

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
    };
    signChange() {
        window.location = "/SignUp";
    };

    render() {
        if (check_login_status()) {
            window.location = "/Welcome";
        };
        return(
            <div>
                <h1 className="title">Landing Page</h1>
                <button onClick={this.logChange}>Login</button>
                <br></br>
                <button onClick={this.signChange}>Sign Up</button>
            </div>
        );
    };
};

export default LandingPage;
