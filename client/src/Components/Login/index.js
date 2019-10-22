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


    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }
    
    // Updates state as soon as anything is typed into the input boxes
    handleSubmit(event) {
        if (this.state.email === "" || this.state.password === "") {
            this.setState ({output : [<p>Please enter an email and password</p>]});
        } else {
            login(this.state.email, this.state.password).then(res => {
                console.log("Logged in!");
                window.location = "/Welcome";
            }).catch(error => {
                console.log(error);
            });
        }
        event.preventDefault();


    }

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
