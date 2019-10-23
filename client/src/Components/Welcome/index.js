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
        this.handleChange = this.handleChange.bind(this);
        this.handleClearSearchText = this.handleClearSearchText.bind(this);
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

    handleChange(event) {
        let clearIcon = document.getElementById('clear-search-icon');
        let name = event.target.name;
        let value = event.target.value.toLowerCase();
        this.setState({[name]: value});

        if (clearIcon) {
            if (value == "") {
                // Empty string
                clearIcon.classList.remove("active");
                clearIcon.classList.add("inactive");
            }
            else {
                // Non-empty string
                clearIcon.classList.remove("inactive");
                clearIcon.classList.add("active");
            }
        }
    }

    handleClearSearchText(event) {
        let clearIcon = document.getElementById('clear-search-icon');
        let searchText = document.getElementById('search-bar-input');
        this.setState({"search": ""});
        if (clearIcon) {
            clearIcon.classList.remove("active");
            clearIcon.classList.add("inactive");
        }
        if (searchText) {
            searchText.value = '';
        }
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
                handleChange={this.handleChange}
                handleClearSearchText={this.handleClearSearchText}
                handleSelectChange={this.handleSelectChange}/>
        )
    }
}

export default Welcome;
