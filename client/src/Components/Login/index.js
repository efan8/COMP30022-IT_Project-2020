/* Login page for users to get access to their welcome page */

import React from 'react';
import '../../style.css';
import LoginComponent from './LoginComponent.js';
import { login } from '../Auth/auth';

class Login extends React.Component {

    constructor() {
        super();
        this.state ={
            email: "",
            password: "",
            output: [<p></p>]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    //Changes email and password in state as user types in their details
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        // Login button and its loading spinner indicator
        let btn = document.getElementById("login-form-btn");
        let spinner = document.getElementById("login-btn-spinner");

        if (this.state.email === "" || this.state.password === "") {
            this.setState ({output : [<p>Please enter an email and password</p>]});
        } else {
            spinner.style.display = "inline-block";
            btn.value = '';
            btn.disabled = true;

            login(this.state.email, this.state.password).then(res => {
                spinner.style.display = "none";
                btn.value = "Sign in";
                btn.disabled = false;

                console.log("Logged in!");
                window.location = "/Welcome";
            }).catch(error => {
                spinner.style.display = "none";
                btn.value = "Sign in";
                btn.disabled = false;
                console.log(error);
            });
        }
        event.preventDefault();
    }

    //Creates the visual aspect of Login
    render() {
        return(
            <LoginComponent
                state={this.state}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />
        );
    };
};

export default Login;
