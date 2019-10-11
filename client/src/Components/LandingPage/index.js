/* Initial page users will see that will take them to login or signup */

import React from 'react';
import { check_login_status } from '../Auth/auth';

class LandingPage extends React.Component {

    constructor() {
        super();
        this.state ={
            name: ""
        };
        this.logChange = this.logChange.bind(this);
        this.signChange = this.signChange.bind(this);
    };
    
    //To change page using buttons
    logChange() {
        window.location = "/Login";
    };
    signChange() {
        window.location = "/SignUp";
    };

    render() {
        check_login_status().then(is_logged_in => {
            if(is_logged_in) {
                window.location = "/Welcome";
            };
        });
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
