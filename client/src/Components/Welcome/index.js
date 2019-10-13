/* A welcome page for the user after logging in where all their items are
   displayed */

import React from 'react';
import '../../style.css';
import WelcomeComponent from './WelcomeComponent';
import { get } from '../HTTP/http';
import { check_login_status } from '../Auth/auth';

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
    

    render() {
        check_login_status().then(is_logged_in => {
            if(!is_logged_in) {
                window.location = "/LandingPage";
            }
        });
        return (
            <WelcomeComponent 
                state={this.state} 
                handleSubmit={this.handleSubmit}
                handleSelectChange={this.handleSelectChange}/>
        )
    }
}

export default Welcome;
