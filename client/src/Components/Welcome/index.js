/* A welcome page for the user after logging in where all their items are
   displayed */

import React from 'react';
import '../../style.css';
import WelcomeComponent from './WelcomeComponent';
import { get } from '../HTTP/http';
import { logout } from '../Auth/auth';

class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {},
            search: "",
            selectedOption: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.logoutPressed = this.logoutPressed.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true})
        get("artifacts")
            .then(res => {
                this.setState({
                    loading: false,
                    item: res.data
                });
            });
    }

    //Handles form submission of searchbar
    handleSubmit(event) {
        this.setState ({search: event.target.search.value.toLowerCase()});
        event.preventDefault();
    }

    handleSelectChange(event) {
        this.setState(
            {selectedOption: event.target[event.target.selectedIndex].value});
    }
    
    logoutPressed() {
        logout().then(() => {
            console.log("Logged out");
            window.location = "/LandingPage";
        });
    };

    render() {
        return (
            <WelcomeComponent 
                state={this.state} 
                handleSubmit={this.handleSubmit}
                handleSelectChange={this.handleSelectChange}
                logoutPressed={this.logoutPressed}/>
        )
    }
}

export default Welcome;
