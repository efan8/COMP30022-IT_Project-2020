/* Add Item form to allow user to input a new item. Still needs
   to send data to the backend */
   
import React from 'react';
import '../../style.css';

import AddItemComponent from './AddItemComponent';


class AddItem extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            imageURL: "",
            description: "",
            tags: [],
            collectionID: "",
            originLocation: "",
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

    render() {
        return(
            <AddItemComponent 
                handleChange={this.handleChange} 
                state={this.state}
            />
        );
        
    };
};

export default AddItem;