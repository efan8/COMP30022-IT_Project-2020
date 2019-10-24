/* What is show to the user when they access the Sign Up screen */

import React from 'react';

function SignUpForm(props) {
    return(
        <div className="landing-background">
        <div id="containerS">
        <form onSubmit={props.handleSubmit}>

                <label>First Name: </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={props.data.firstName}
                    onChange={props.handleChange}
                />

                <label>Last Name: </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={props.data.lastName}
                    onChange={props.handleChange}
                />

                <label>Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={props.data.email}
                    onChange={props.handleChange}
                />

                <label>Password: </label>
                <input
                    type="password"
                    id="passwordOne"
                    name="passwordOne"
                    value={props.data.passwordOne}
                    onChange={props.handleChange}
                />

                <label>Re-enter Password: </label>
                <input
                    type="password"
                    id="passwordTwo"
                    name="passwordTwo"
                    value={props.data.passwordTwo}
                    onChange={props.handleChange}
                />

                <div id="lower">
                    <div className="wrap-form-btn">
                        <input id="signup-form-btn" type="submit" value="Sign up"/>
                        <div id="signup-btn-spinner" className={"spinner login-btn-spinner"}>
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default SignUpForm;
