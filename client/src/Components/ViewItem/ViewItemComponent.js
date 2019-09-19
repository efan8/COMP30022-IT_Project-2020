import React from 'react';

function ViewItemComponent(props){

    // Gets the tag names from the json file
    let keys = [];
    for(let k in props.state.item.tags) keys.push(k);

    // Generates the tag buttons from the list of tags
    let i = 0;
    const tagComponents = keys.map(key => <button className="basicButton" key={i++}>{key}</button>)

    return(
        <div>
            <h1 className="title">{this.state.item.name}</h1>
            <img src={props.state.item.imageURL} alt="" className="mediumImage"/>

            <h3>Description:</h3>
            <p>{props.state.item.description}</p>

            <h3>Tags:</h3>
            {tagComponents}

            <h3>Collection:</h3>
            <p>{props.state.item.collectionID}</p>

            <h3>Location:</h3>
            <p>{props.state.item.originLocation}</p>

            <h3>Origin Date:</h3>
            <p>{props.state.item.originDate}</p>
            
        </div>
    );
};

export default ViewItemComponent;