/* Basic navbar to access all pages */

import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">LandingPage</NavLink>
          <br></br>
          <NavLink to="/Welcome">Welcome</NavLink>
          <br></br>
          <NavLink to="/AddItem">AddItem</NavLink>
          <br></br>
          <NavLink to="/ViewItem">ViewItem</NavLink>
          <br></br>
          <NavLink to="/AddCollection">AddCollection</NavLink>
          <br></br>
          <NavLink to="/Login">Login</NavLink>
          <br></br>
          <NavLink to="/SignUp">SignUp</NavLink>
          <br></br>
          <NavLink to="/ItemBlockTest">ItemBlockTest</NavLink>
          <br></br>
          <NavLink to="/EditItem">Edit Item</NavLink>
       </div>
    );
};
 
export default Navigation;