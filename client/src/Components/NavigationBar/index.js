/* Basic navbar to access all pages */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../Auth/auth';


class NavigationBar extends React.Component {

    constructor() {
        super();
        this.state ={
            name: ""
        };
    };
    
    navigationHandle() {
        
    }
    render() {
        return(
            <header className="mainNavigation">
                <div className="mainNavigationLogo">
                    <h1>FridaySlackers</h1>
                </div>
                <nav className="mainNavigationItems">
                    <ul>
                        <li><NavLink to="/LandingPage">Home</NavLink></li>
                        <li><NavLink to="/Welcome">Welcome</NavLink></li>
                        <li><NavLink to="/AddItem">Add Item</NavLink></li>
                    </ul>
                </nav>
                <NavLink className="logout"
                    to="/LandingPage" 
                    onClick={logout}>Logout
                </NavLink>
            </header>
        )
    }
/*     render() {
        return(
            <div>
               <NavLink to="/">LandingPage</NavLink>
               <NavLink to="/Welcome">Welcome</NavLink>
               <NavLink to="/AddItem">AddItem</NavLink>
               <NavLink to="/ViewItem">ViewItem</NavLink>
               <NavLink to="/ViewTag">ViewTag</NavLink>
               <NavLink to="/AddCollection">AddCollection</NavLink>
               <NavLink to="/Login">Login</NavLink>
               <NavLink to="/SignUp">SignUp</NavLink>
               <NavLink to="/ItemBlockTest">ItemBlockTest</NavLink>
               <NavLink to="/EditItem">Edit Item</NavLink>
               <NavLink to="/LandingPage" onClick={logout}>Logout</NavLink>
            </div>
        );
    }; */
};

export default NavigationBar;