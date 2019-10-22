/* What is show to the user when they access the login screen */

import React from 'react';

function Login(props) {
    return(
        <div style={{marginTop: "4rem"}} id="container">
            <form onSubmit={props.handleSubmit}>
                {props.state.output}
                <label for="email">Email: </label>
                <input 
                    type="email"
                    name="email"
                    onChange={props.handleChange}
                />
                <label for="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={props.handleChange}
                />
                <div id="lower">
                <input type="submit" value="Login"/>
                </div>
            </form>
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