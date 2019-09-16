import React from 'react';

function SignUpForm(props) {
    return(
        <form>
                <h1 className="title">Sign Up</h1>

                <h3>First Name:</h3>
                <input 
                    type="textbox"
                    name="firstName" 
                    value={props.data.firstName} 
                    onChange={props.handleChange}
                />

                <h3>Last Name:</h3>
                <input 
                    type="textbox"
                    name="lastName" 
                    value={props.data.lastName} 
                    onChange={props.handleChange}
                />

                <h3>Email:</h3>
                <input 
                    type="textbox" 
                    name="email" value={props.data.email} 
                    onChange={props.handleChange}
                />

                <h3>Password:</h3>
                <input 
                    type="password" 
                    name="passwordOne" 
                    value={props.data.passwordOne} 
                    onChange={props.handleChange}
                />

                <h3>Re-enter Password:</h3>
                <input 
                    type="password" 
                    name="passwordTwo" 
                    value={props.data.passwordTwo} 
                    onChange={props.handleChange}
                />

                <p>Name: {props.data.firstName + " " + props.data.lastName} email: {props.data.email}</p>
            </form>

    );
}

export default SignUpForm;