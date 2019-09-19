/* What is show to the user when they access the Sign Up screen */

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
                <br></br>
                <button>Sign Up</button>
            </form>
    );
};

export default SignUpForm;