/* What is show to the user when they access the login screen */

import React from 'react';

function Login(props) {
    return(
        <form onSubmit={props.handleSubmit}>
            <h1 className="title">Login</h1>
            {props.state.output}
            <h3>Email:</h3>
            <input 
                type="textbox"
                name="email"
                onChange={props.handleChange}
            />
            <h3>Password:</h3>
            <input
                type="password"
                name="password"
                onChange={props.handleChange}
            />
            <br></br>
            <input type="submit" value="Login"/>
        </form>
    );
};

export default Login;