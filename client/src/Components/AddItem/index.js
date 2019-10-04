/* Add Item form to allow user to input a new item. Still needs
   to send data to the backend */

import React from 'react';
import '../../style.css';
import { blank_item } from '../../Constants/index'

import AddItemComponent from './AddItemComponent';
import axios from 'axios';
import { put } from '../HTTP/http';


class AddItem extends React.Component {

    constructor() {
        super();

        this.state = blank_item;
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTagSubmit = this.onTagSubmit.bind(this);
    };

    handleChange(event){
        const {name, value} = event.target;
        this.setState(
            {[name]: value}
        );
        console.log(this.state)
    };

    onTagSubmit() {

        let tag = this.state.currentTypedTag.toString();
        console.log(tag)
        this.state.tags[tag] = true
        console.log(this.state)
        this.setState(
            {"currentTypedTag": ""}
        )
    }

    onSubmit() {
        let body = JSON.stringify(this.state);

        console.log(body);
        console.log(this.state);
        put('artifacts',
            this.state)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    render() {
        return(
            <div>
                <AddItemComponent
                    handleChange={this.handleChange}
                    state={this.state}
                    submit={this.onSubmit}
                    tagSubmit={this.onTagSubmit}
                />
            </div>

        );

    };
};

export default AddItem;
