/* Basic navbar to access all pages */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout, check_login_status } from '../Auth/auth';

class NavigationBar extends React.Component {

    constructor() {
        super();
        this.state ={
            isSignedIn: false,
            name: ""
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleMenuThenLogout = this.toggleMenuThenLogout.bind(this);
    };

    navigationHandle() {

    }

    toggleMenu(event) {
        let mainNavLinks = document.getElementById('main-nav-links');
        let openIcon = document.getElementById('navbar-icon-open');
        let closeIcon = document.getElementById('navbar-icon-close');

        mainNavLinks.classList.toggle('active');
        openIcon.classList.toggle('active');
        openIcon.classList.toggle('inactive');
        closeIcon.classList.toggle('active');
        closeIcon.classList.toggle('inactive');
    }

    toggleMenuThenLogout(event) {
        let mainNavLinks = document.getElementById('main-nav-links');
        let openIcon = document.getElementById('navbar-icon-open');
        let closeIcon = document.getElementById('navbar-icon-close');

        mainNavLinks.classList.toggle('active');
        openIcon.classList.toggle('active');
        openIcon.classList.toggle('inactive');
        closeIcon.classList.toggle('active');
        closeIcon.classList.toggle('inactive');

        logout().then(() => {
            this.setState({ isSignedIn: false });
            window.location = "/LandingPage";
        });
    }

    render() {
        check_login_status().then(is_logged_in => {
            if(is_logged_in) {
                this.setState({ isSignedIn: true });
            }
        });

        var visible_tabs = [];
        if (this.state.isSignedIn == true) {
            visible_tabs.push(
                <ul>
                    <li><NavLink onClick={this.toggleMenu} to="/Welcome">Home</NavLink></li>
                    <li><NavLink onClick={this.toggleMenu} to="/AddItem">Add Artifact</NavLink></li>
                    <li>
                        <span className="logout" onClick={this.toggleMenuThenLogout}>Logout</span>
                    </li>
                </ul>
            );
        }
        else {
            visible_tabs.push(
                <ul>
                    <li><NavLink onClick={this.toggleMenu} to="/LandingPage">Home</NavLink></li>
                </ul>
            );
        }

        return(
            <header className="mainNavigation">
                <nav className="mainNavigationItems">
                <span className="mainNavigationLogo">
                    <h1>FridaySlackers</h1>
                </span>
                    <span onClick={this.toggleMenu} className="navbar-toggle" id="navbar-toggle">
                        <svg id="navbar-icon-open" className="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20" height="20">
                            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/>
                        </svg>
                        <svg id="navbar-icon-close" className="inactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20" height="20">
                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/>
                        </svg>
                    </span>
                    <span className="main-nav-links" id="main-nav-links">
                    <React.Fragment>{visible_tabs}</React.Fragment>

                    </span>
                </nav>
            </header>
        );
    }
};

export default NavigationBar;
