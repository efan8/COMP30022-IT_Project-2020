/* A welcome page for the user after logging in where all their items are
   displayed */

import React from 'react';
import '../../style.css';
import WelcomeComponent from './WelcomeComponent';

class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {},
            search: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch("http://localhost:3001/api/artifacts?")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    item: data
                })
            })
    }

    //Handles form submission of searchbar
    handleSubmit = (event) => {
        this.setState ({search: event.target.search.value.toLowerCase()});
        event.preventDefault();
        console.log(this.state.search);
    }
    

    render() {
        return (
            <WelcomeComponent 
                state={this.state} 
                handleSubmit={this.handleSubmit}/>
        )
    }
}

export default Welcome;