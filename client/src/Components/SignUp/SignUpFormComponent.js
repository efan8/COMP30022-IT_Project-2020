/* What is show to the user when they access the Sign Up screen */

import React from 'react';

function SignUpForm(props) {
    return(
        <div className="landing-background">
        <div id="containerS">
        <form onSubmit={props.handleSubmit}>

                <label for="firstName">First Name: </label>
                <input
                    type="email"
                    id="firstName"
                    name="firstName"
                    value={props.data.firstName}
                    onChange={props.handleChange}
                />

                <label for="lastName">Last Name: </label>
                <input
                    type="email"
                    id="lastName"
                    name="lastName"
                    value={props.data.lastName}
                    onChange={props.handleChange}
                />

                <label for="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={props.data.email}
                    onChange={props.handleChange}
                />

                <label for="passwordOne">Password: </label>
                <input
                    type="password"
                    id="passwordOne"
                    name="passwordOne"
                    value={props.data.passwordOne}
                    onChange={props.handleChange}
                />

                <label for="passwordTwo">Re-enter Password: </label>
                <input
                    type="password"
                    id="passwordTwo"
                    name="passwordTwo"
                    value={props.data.passwordTwo}
                    onChange={props.handleChange}
                />

                <div id="lower">
                <input type="submit" value="Sign up"/>
                </div>
            </form>
            </div>
        </div>
    );
};

export default SignUpForm;
