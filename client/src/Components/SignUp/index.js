/* A basic Signup page for users to input their username, email and password.
   Still need to add backend updates. */

import React from 'react';
import '../../style.css';
import SignUpFormComponent from './SignUpFormComponent';
import { signup, login } from '../Auth/auth';

class SignUp extends React.Component {

    constructor() {
        super();
        this.state ={
            firstName: "",
            lastName: "",
            email: "",
            passwordOne: "",
            passwordTwo: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    // Updates state as soon as anything is typed into the input boxes
    handleChange(event){
        const{name, value} = event.target;
        this.setState(
            {[name]: value}
        );
    };

    handleSubmit(event) {
        console.log("handling submit button pressed");
        if (this.state.firstName == "" || this.state.lastName == "" ||
            this.state.email == "" || this.state.passwordOne == "" ||
            this.state.passwordTwo == "") {
                console.log("Please fill in all details before submitting");
                this.setState ({output : [<p>Please fill in all details before submitting</p>]});
        }
        else if (this.state.passwordOne.length < 6) {
            console.log("Password must be at least 6 characters long.");
            this.setState ({output : [<p>Password must be at least 6 characters long</p>]});
        }
        else if (this.state.passwordOne != this.state.passwordTwo) {
            console.log("Passwords do not match");
            this.setState ({output : [<p>Passwords do not match</p>]});
        }
        else {
            console.log("Input valid, signing up now...");
            // Sign up this user via backend
            var user = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "password": this.state.passwordOne
            };
            signup(user).then(res => {
                var new_user_json = res.data;
                console.log(new_user_json);

                // Sign in with email and password, obtaining user's ID token
                console.log("signing in...");
                return login(user.email, user.password);
            }).then(res => {
                // Navigate to Welcome page
                //
                //
                console.log("Signed up and signed in! Navigating to welcome page now...");
            }).catch(function(error) {
                console.log(error);
            });
        }
        event.preventDefault();
    }

    render() {
        return(
            <SignUpFormComponent
                data={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    };
};

export default SignUp;
