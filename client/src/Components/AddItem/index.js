/* Add Item form to allow user to input a new item. Currently users can 
   input a name, description, tags, collection, location (in coordindates)
   and origin date. Majority of this data is sent to backend correctly */
   
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
        this.keyPress = this.keyPress.bind(this);
        this.getDataList = this.getDataList.bind(this);
    };

    // Handles updates to form values
    handleChange(event){
        const {name, value} = event.target;
        if(name == "choice"){
            console.log("location" + value)
            this.setState(
                {"originLocation": {
                    "lat": this.state.results[value].lat,
                    "long": this.state.results[value].lon
                    }
                }
            )
        }
        else{
            this.setState(
                {[name]: value}
            );
        }
        
        console.log(this.state)
    };

    // Handles enter key to update tag values with str length validation
    keyPress(e){
        if(e.keyCode == 13 && e.target.value.length > 0){
            console.log('value', e.target.value);
            this.state.tags[e.target.value.toString()] = true
            console.log(this.state)
            this.setState(
                {"currentTypedTag": ""}
            )
        }
    }

    // Handles add tag button like keyPress function above
    onTagSubmit() {
        if(this.state.currentTypedTag.length > 0){
            let tag = this.state.currentTypedTag.toString();
            console.log(tag)
            this.state.tags[tag] = true
            console.log(this.state)
            this.setState(
                {"currentTypedTag": ""}
            )
        }
        
    }

    // Final form submit button which sends infomation to backend
    onSubmit() {

        if(this.state.originLocation.lat === null){
            console.log("CANT DO IT")
        }
        else{
            let body = JSON.stringify(this.state);
        
            console.log(body);
            console.log(this.state);
            axios.put(`http://localhost:3001/api/artifacts`, 
                this.state)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }
        )
        }
    };

    async getDataList(){
        
        await fetch(`https://us1.locationiq.com/v1/search.php?key=5bbb3f798e3174&q=${this.state.locationString}&format=json`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                results: data
            })
        }
            
            
        )
    }

    render() {
        return(
            <div>
                <AddItemComponent
                    handleChange={this.handleChange}
                    state={this.state}
                    submit={this.onSubmit}
                    tagSubmit={this.onTagSubmit}
                    keyDown={this.keyPress}
                    locationSubmit={this.getDataList}
                />
            </div>

        );

    };
};

export default AddItem;
