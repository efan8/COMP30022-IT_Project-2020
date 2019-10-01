/* A basic Signup page for users to input their username, email and password.
   Still need to add backend updates. */

import React from 'react';
import '../../style.css';
import SignUpFormComponent from './SignUpFormComponent';
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';

const transport = axios.create({
  withCredentials: true
});

const firebaseConfig = {
    apiKey: "AIzaSyDlG7W2KW8AzVM-W5tOYlcrAiH9lDbzv1Y",
    authDomain: "it-project-2019sem2.firebaseapp.com",
    databaseURL: "https://it-project-2019sem2.firebaseio.com",
    projectId: "it-project-2019sem2",
    storageBucket: "",
    messagingSenderId: "240150750224",
    appId: "1:240150750224:web:b6b663108abd79251e1695"
};

// Endpoints
const BACKEND_ROOT = "http://localhost:3001/api/"
const SIGNUP = BACKEND_ROOT + "signup";
const LOGIN = BACKEND_ROOT + "login";

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
            transport.put(SIGNUP, user).then(res => {
                console.log(res);
                var new_user_json = res.data;
                console.log(new_user_json);

                // Sign in with email and password, obtaining user's ID token
                console.log(user);
                console.log("signing in...");
                return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
            }).then(user_credential => {
                console.log("signed in");
                console.log(user_credential);
                console.log(user_credential.user ? user_credential.user.getIdToken() : "null");
                // Get the user's ID token as it is needed to exchange for a session cookie.
                return user_credential.user.getIdToken();
            }).then(idToken => {
                console.log("ID Token: " + idToken);
                // Session login endpoint in backed is queried and the session cookie is set.
                return transport.post(LOGIN, { "idToken": idToken });
            }).then(() => {
                // A page redirect would suffice as the persistence is set to NONE.
                return firebase.auth().signOut();
            }).then(() => {
                // Navigate to Welcome page
                //
                //
                console.log("Signed up and signed in! Navigating to welcome page now...")
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
