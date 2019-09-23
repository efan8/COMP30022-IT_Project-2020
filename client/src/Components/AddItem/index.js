/* Add Item form to allow user to input a new item. Still needs
   to send data to the backend */
   
import React from 'react';
import '../../style.css';

import AddItemComponent from './AddItemComponent';
import axios from 'axios';


class AddItem extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            imageURL: "",
            description: "",
            tags: [],
            collectionID: "",
            originLocation: {lat: 0, long: 0},
            orginDate: "",
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event){
        const {name, value} = event.target;
        this.setState(
            {[name]: value}
        );
    };

    putDataToDB = (message) => {``
        axios.post('http://localhost:3001/api/artifacts', this.state);
    };

    render() {
        return(
            <div>
                <AddItemComponent 
                    handleChange={this.handleChange} 
                    state={this.state}
                />
                <button onClick={() => this.putDataToDB(this.state.message)}>SIGNUP</button>
            </div> 
        );
        
    };
};

export default AddItem;