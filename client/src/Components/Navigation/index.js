/* Basic navbar to access all pages */

import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Welcome</NavLink>
          <br></br>
          <NavLink to="/AddItem">AddItem</NavLink>
          <br></br>
          <NavLink to="/ViewItem">ViewItem</NavLink>
          <br></br>
          <NavLink to="/SignUp">SignUp</NavLink>
          <br></br>
          <NavLink to="/ItemBlockTest">ItemBlockTest</NavLink>
       </div>
    );
};
 
export default Navigation;