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
            "id": "",
            "name": "IMG5000.jpg",
            "description": "Photo of Sydney Opera House",
            "ownerID": "abc123",
            "originDate": 1548823080,
            "originLocation": {
              "lat": -33.855659,
              "long": 151.210553
            },
            "knownLocation": {
              "lat": -82.468636,
              "long": -87.998860
            },
            "collectionID": 2019,
            "tags": {
              "photo": true,
              "Sydney": true,
              "architecture": true
            }
          };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    handleChange(event){
        const {name, value} = event.target;
        this.setState(
            {[name]: value}
        );
    };

    onSubmit() {
        let body = JSON.stringify(this.state);
        
        console.log(body);
        console.log(this.state);
        axios.put(`http://localhost:3001/api/artifacts`, 
            this.state)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    render() {
        return(
            <div>
                <AddItemComponent 
                    handleChange={this.handleChange} 
                    state={this.state}
                    submit={this.onSubmit}
                />
            </div> 
            
        );
        
    };
};

export default AddItem;