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
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleMenuThenLogout = this.toggleMenuThenLogout.bind(this);
    };

    navigationHandle() {

    }

    toggleMenu(event) {
        let mainNavLinks = document.getElementById('main-nav-links');
        console.log(mainNavLinks.classList);
        mainNavLinks.classList.toggle('active');
    }

    toggleMenuThenLogout(event) {
        let mainNavLinks = document.getElementById('main-nav-links');
        console.log(mainNavLinks.classList);
        mainNavLinks.classList.toggle('active');
        logout();
    }

    render() {
        return(
            <header className="mainNavigation">
                <nav className="mainNavigationItems">
                <span className="mainNavigationLogo">
                    <h1>FridaySlackers</h1>
                </span>
                    <span onClick={this.toggleMenu} className="navbar-toggle" id="navbar-toggle">
                        <svg id="nav-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20" height="20">
                            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/>
                        </svg>
                    </span>
                    <span className="main-nav-links" id="main-nav-links">
                    <ul>
                        <li><NavLink onClick={this.toggleMenu} to="/LandingPage">Home</NavLink></li>
                        <li><NavLink onClick={this.toggleMenu} to="/Welcome">Welcome</NavLink></li>
                        <li><NavLink onClick={this.toggleMenu} to="/AddItem">Add Item</NavLink></li>
                        <li>
                            <NavLink className="logout" to="/LandingPage"
                                onClick={this.toggleMenuThenLogout}>Logout
                            </NavLink>
                        </li>
                    </ul>

                    </span>
                </nav>
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
