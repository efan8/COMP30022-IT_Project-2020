 /* This visual aspect of both the Add item and edit item pages. 
    This page adapts depending on what the user would like to do */

import React from 'react';
import '../../style.css';
import DatePicker from 'react-date-picker'

function AddItemComponent(props) {

    // Gets the tag names from the json file and adds them if they are true
    let keys = []
    if(props.state.tags){
        let tags = Object.keys(props.state.tags)
        keys = tags.filter(function(id){
            return props.state.tags[id]
        })
    }

    // Generate tag buttons for user when they type them in
    let i = 0;
    const tagComponents = keys.map(key =>
        <button className="basicButton"
            key={i++}
            onClick={props.deleteTag}
            type="button"
            value={key.toString()}>{key}</button>)

    // Get the resulting items from a location search for the dropdown list
    let items = [];
    if(props.state.results.length > 0){
        items.push({
            name: "Please choose one of the following locations",
            lat: null,
            long: null
        })

        // Create a dropdown option and set the values of the lat/long
        for(let i = 0; i < props.state.results.length; i ++){
            items.push({
                name: props.state.results[i].display_name,
                long: props.state.results[i].lon,
                lat: props.state.results[i].lat
            })
        }
    }

    // Put the location items into the actual select component
    i = 0;
    const itemComponents = items.map(item =>
        <option value={i} key={i++}>{item.name}</option>
    )
    
    // The Form that is displayed to the user. The enter key is disabled for form submission.
    return (
        <div className="solid-page-container">
            <form className="center" onSubmit={e => { e.preventDefault(); }}>

                {/* The styling and the element where the user enters/edits the name of the item*/}
                <h3 className="heading">Item Name:*</h3>
                <input
                    name="name"
                    type="textbox"
                    value={props.state.name}
                    onChange={props.handleChange}
                    placeholder="Enter name of artifact..."
                    className={"textbox grey-background"}/>
                <br></br>

                {/* Image Input: When clicked it opens a dialog box and allows user to upload an image */}
                <input
                    className="textbox"
                    type="file"
                    name="selectedFile"
                    onChange={props.handleImageUpload}
                    accept="image/*"
                    />
                {props.state.files && props.state.files.length > 0 ? 
                    false : <h5>*You must upload an image</h5>}

                {/* Displays and passes the input that user types into the description box */}
                <h3 className="centerText">Description:*</h3>
                <textarea
                    placeholder="Enter a description of the artifact..."
                    className={"descriptionbox grey-background"}
                    name="description"
                    value={props.state.description}
                    onChange={props.handleChange}
                    />

                {/* Allows the user to input tags and view/delete them */}
                <h3 className="centerText">Tags:</h3>
                <p className="centerText">{tagComponents}</p>
                <input
                    className="grey-background"
                    placeholder="Enter tag here"
                    name="currentTypedTag"
                    value={props.state.currentTypedTag}
                    onChange={props.handleChange}
                    onKeyDown={props.keyDown}
                    />
                <button
                    className="purple-button"
                    onClick={props.tagSubmit}
                    type="button">
                    Add tag
                    </button>

                {/* Lets user input a location as a string. A suggestion box would replace this but requires premium access to the api */}
                <h3 className="centerText">Location:</h3>
                <input
                    className={"textbox grey-background"}
                    placeholder="Enter origin location of artifact..."
                    name="locationString"
                    value={props.state.locationString}
                    onChange={props.handleChange}
                />
                {itemComponents ? <select
                                    className="textbox"
                                    name="choice"
                                    onChange={props.handleChange}>
                                        {itemComponents}
                                    </select> : 
                                    <div></div>
                }
                <button
                    className={"centerButton purple-button"}
                    onClick={props.locationSubmit}>
                    Find location
                    </button>

                {/* Utilises the DatePicker library so that user can input a date */}
                <h3 className="centerText">Origin Date:</h3>
                <DatePicker className="centerDate" name="originDate" value={props.state.originDate}
                onChange={props.dateChange}/>


                <br></br>
                <br></br>

                {/* The submit button which is disabled until valid input is entered. Also handles the loading icon*/}
                <div className="wrap-form-btn">
                    <button id="add-item-submit-btn" className="submit-button" onClick={props.submit}
                        disabled={!props.isEnabled}>Done</button>
                    <div id="add-item-btn-spinner" className={"spinner add-item-btn-spinner"}>
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>

            </form>
        </div>

    );
};

export default AddItemComponent;
