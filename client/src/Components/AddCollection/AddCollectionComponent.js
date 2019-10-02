/* What is shown to the user when they want to add a collection */

import React from 'react';
import '../../style.css';

function AddCollectionComponent(props) {

    return (
        <form onSubmit={props.submit}>
            <h1 className="title">Add Collection</h1>
            <h3 className="heading">Collection Name:</h3>

            <input
                name="name"
                type="textbox"
                value={props.state.name}
                onChange={props.handleChange}
                placeholder="Type Collection name here"
                className="textbox"/>
            
            <h3>Description:</h3>
            <input 
                placeholder="Simple Description of  object and stuff"
                className="descriptionbox"
                name="description"
                value={props.state.description}
                onChange={props.handleChange}
                />



            <h3>Origin Date:</h3>
            <input/> <button>changeDate</button>

            <br></br>
            <button>Submit</button>
        </form>

    );
};

export default AddCollectionComponent;