/* What is show to the user when they access the login screen */

import React from 'react';

function Login(props) {
    return(
        <div className="landing-background">
        <div id="containerL">
            <form onSubmit={props.handleSubmit}>
                {props.state.output}
                <label for="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={props.handleChange}
                />
                <label for="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={props.handleChange}
                />
                <div id="lower">
                    <div className="wrap-form-btn">
                        <input id="login-form-btn" type="submit" value="Sign in"/>
                        <div id="login-btn-spinner" className={"spinner spinner-light"}>
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

export default Login;

{/* <label for="username">Username:</label>
<input type="text" id="username" name="username">
<label for="password">Password:</label>
<input type="password" id="password" name="password">
<div id="lower">
<input type="checkbox"><label for="checkbox">Keep me logged in</label>
<input type="submit" value="Login"></input> */}
