import React from 'react';
import styles from '../../style.css';
import defaultImage from '../../placeholder.png';
import data from './testItem.json';

class ViewItem extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {}
        }
    }

    // will put a fetch comand in to get data from api
    componentDidMount() {
        this.setState({loading:true})
        // fetch("api website")
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({
        //         item: data
        //     })
        // })
        this.setState({
            loading: false,
            item: data
        })

    }

    render() {
        
        // Gets the tag names from the json file
        let keys = [];
        for(let k in this.state.item.tags) keys.push(k);

        return(
        <div>
            <h1 className="title">{this.state.item.name}</h1>
            <img src={this.state.item.imageURL} alt="no image" />

            <h3>Description:</h3>
            <p>{this.state.item.description}</p>

            <h3>Tags:</h3>
            <button className="basicButton">{keys[0]}</button>
            <button className="basicButton">{keys[1]}</button> 

            <h3>Collection:</h3>
            <p>{this.state.item.collectionID}</p>

            <h3>Location:</h3>
            <p>{this.state.item.originLocation}</p>

            <h3>Origin Date:</h3>
            <p>{this.state.item.originDate}</p>
            
        </div>
        )
        
    }
}

export default ViewItem;