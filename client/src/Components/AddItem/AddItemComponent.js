/* What is shown to the user when they want to add an item */

import React from 'react';
import '../../style.css';
import defaultImage from '../../placeholder.png';

function AddItemComponent(props) {

    // Gets the tag names from the json file
    let keys = [];
    for(let k in props.state.tags) keys.push(k);

    // generate tag buttons for user when they type them in
    let i = 0;
    const tagComponents = keys.map(key => <button className="basicButton" key={i++} type="button">{key}</button>)

    return (
        <form onSubmit={props.submit}>
            <h1 className="title">Add Item</h1>
            <h3 className="heading">Item Name:</h3>

            <input
                name="name"
                type="textbox"
                value={props.state.name}
                onChange={props.handleChange}
                placeholder="Type item name here"
                className="textbox"/>
            
            <input type="file" name="file" onChange={props.handleChange}/>

            <h3>Description:</h3>
            <input 
                placeholder="Simple Description of  object and stuff"
                className="descriptionbox"
                name="description"
                value={props.state.description}
                onChange={props.handleChange}
                />

            <h3>Tags:</h3>
            {tagComponents}
            <br></br>
            <input
                placeholder="Enter tag here"
                name="currentTypedTag"
                value={props.state.currentTypedTag}
                onChange={props.handleChange} 
                />
            <button 
                onClick={props.tagSubmit}
                type="button">
                add tag
                </button>

            <h3>Collection:</h3>
            <select>
                <option value="collection1">collection1</option>
                <option value="collection2">collection2</option>
                <option value="collection3">collection3</option>
                <option value="newcollection">create new collection</option>
            </select>

            <h3>Location:</h3>
            <input placeholder="CurrentLocation" />

            <h3>Origin Date:</h3>
            <input/> <button>changeDate</button>

            <br></br>
            <button>Submit</button>
        </form>

    );
};

export default AddItemComponent;