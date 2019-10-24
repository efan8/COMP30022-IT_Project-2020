/* Initial page users will see that will take them to login or signup */

import React from 'react';
import '../../style.css';
import { check_login_status } from '../Auth/auth';
import load from '../../Resources/load.gif';

class LandingPage extends React.Component {

    constructor() {
        super();
        this.state ={
            loading: true,
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
            }
            else {
                this.setState({ loading: false });
            }
        });
        if (this.state.loading == true) {
            return(
                <div className = "center" >
                    <img className = "load" src={load} alt="loading..." />
                </div>
            );
        }
        else {
            return(
                <div className="landing-background">
                <div id="containerLand">
                    <h1 className="landing-title">Welcome!</h1>
                    <br></br>
                    <button
                        className="landButton"
                        onClick={this.logChange}
                    >Sign in</button>
                    <br></br>
                    <button
                    className="landButton"
                        onClick={this.signChange}
                    >Sign up</button>
                </div>
                </div>
            );
        }
    };
};

export default LandingPage;
