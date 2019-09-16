/* A basic Signup page for users to input their username, email and password.
 * Still need to add backend updates. */

import React from 'react';
import Styles from '../../style.css';
import SignUpFormComponent from './SignUpFormComponent';

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
            <SignUpFormComponent 
                data={this.state} 
                handleChange={this.handleChange}
            />
        );
    }
}

export default SignUp;