// A basic Signup page for users to input their username, email and password.
// Still need to add backend updates.

import React from 'react';
import styles from '../../style.css';

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
    }

    // Updates state as soon as anything is typed into the input boxes
    handleChange(event){
        const{name, type, value} = event.target;
        this.setState(
            {[name]: value}
        );
    }

    render() {
        return(
            <form>
                <h1 className="title">Sign Up</h1>
                <h3>First Name:</h3>
                <input type="textbox" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                <h3>Last Name:</h3>
                <input type="textbox" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                <h3>Email:</h3>
                <input type="textbox" name="email" value={this.state.email} onChange={this.handleChange}/>
                <h3>Password:</h3>
                <input type="password" name="passwordOne" value={this.state.passwordOne} onChange={this.handleChange}/>
                <h3>Re-enter Password:</h3>
                <input type="password" name="passwordTwo" value={this.state.passwordTwo} onChange={this.handleChange}/>

                <p>Name: {this.state.firstName + " " + this.state.lastName} email: {this.state.email}</p>
            </form>
        );
    }
}

export default SignUp;