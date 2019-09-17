/* A full display of the artifact detailing all information provided to 
   the backend */

import React from 'react';
import Styles from '../../style.css';
import Data from './testItem.json';

class ViewItem extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {}
        }
    }

    // will put a fetch comand in to get data from api
    // Currently using a local json file.
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
            item: Data
        })

    }

    render() {
        
        // Gets the tag names from the json file
        let keys = [];
        for(let k in this.state.item.tags) keys.push(k);

        // Generates the tag buttons from the list of tags
        const tagComponents = keys.map(key => <button className="basicButton">{key}</button>)

        return(
            <div>
                <h1 className="title">{this.state.item.name}</h1>
                <img src={this.state.item.imageURL} alt="no image" className="mediumImage"/>

                <h3>Description:</h3>
                <p>{this.state.item.description}</p>

                <h3>Tags:</h3>
                {tagComponents}

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