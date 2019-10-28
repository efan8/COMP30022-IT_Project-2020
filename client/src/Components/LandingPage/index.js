/* The page users will see when they first access the website, from here they
    can navigate to either signup or signin */

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

    //OnClick functions to navigate user to signin or signup
    logChange() {
        window.location = "/Login";
    };
    signChange() {
        window.location = "/SignUp";
    };

    render() {
        //Checks whether a user is logged in via cookies
        check_login_status().then(is_logged_in => {

            //If they are logged in already it sends them to welcome page
            if(is_logged_in) {
                window.location = "/Welcome";
            }
            else {
                this.setState({ loading: false });
            }
        });

        //If page hasnt loaded yet, loading gif is displayed
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

                    {/* Button that takes user to signin */}
                    <button
                        className="landButton"
                        onClick={this.logChange}
                    >Sign in</button>
                    <br></br>

                    {/* Button that takes user to signup */}
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
