/* A basic Signup page for users to input their username, email and password.
   Still need to add backend updates. */

import React from 'react';
import '../../style.css';
import SignUpFormComponent from './SignUpFormComponent';
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlG7W2KW8AzVM-W5tOYlcrAiH9lDbzv1Y",
    authDomain: "it-project-2019sem2.firebaseapp.com",
    databaseURL: "https://it-project-2019sem2.firebaseio.com",
    projectId: "it-project-2019sem2",
    storageBucket: "",
    messagingSenderId: "240150750224",
    appId: "1:240150750224:web:b6b663108abd79251e1695"
};

firebase.initializeApp(firebaseConfig);

// As httpOnly cookies are to be used, do not persist any state client side.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

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
    };

    // Updates state as soon as anything is typed into the input boxes
    handleChange(event){
        const{name, value} = event.target;
        this.setState(
            {[name]: value}
        );
    };

    handleSubmit(event) {
        if (this.state.firstName == "" || this.state.lastName == "" ||
            this.state.email == "" || this.state.passwordOne == "" ||
            this.state.passwordTwo == "") {
            this.setState ({output : [<p>Please fill in all details before submitting</p>]});
        }
        else if (this.state.passwordOne != this.state.passwordTwo) {
            this.setState ({output : [<p>Passwords do not match</p>]});
        }
        else {
            // Sign up this user via backend
            //
            // Sign in with email and password, obtaining user's ID token
            //
            // Request session cookie from backend, providing ID token
            //
            // Clear state, now that a cookie has been obtained
            //
        }
        event.preventDefault();
    }

    render() {
        return(
            <SignUpFormComponent
                data={this.state}
                handleChange={this.handleChange}
            />
        );
    };
};

export default SignUp;
