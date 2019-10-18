import React from 'react';
import { NavLink } from 'react-router-dom';

function ViewItemComponent(props){


    // Gets the tag names from the json file and adds them if they are true
    let keys = []
    if(props.state.item.tags){
        let tags = Object.keys(props.state.item.tags)
        keys = tags.filter(function(id){
            return props.state.item.tags[id]
        })
    }
    console.log(keys)
    // Generates the tag buttons from the list of tags
    let i = 0;
    const tagComponents = keys.map(key => <div><NavLink to={{
        pathname:"/ViewTag",
        aboutProps:{
            viewTag : key
        }
    }} >{key}</NavLink>
    <br></br></div>)


    const {originLocation} = props.state.item;
    const {lat, long} = originLocation ? originLocation : "";
    console.log(lat)


    let dateObj = new Date(props.state.item.originDate);


    return(
        <div>
            <h1 className="title">{props.state.item.name}</h1>
            <img src={props.state.item.imageURLs ? props.state.item.imageURLs[0] : ""} alt="" className="mediumImage"/>

            <h3>Description:</h3>
            <p>{props.state.item.description}</p>


            <h3>Tags:</h3>
            {tagComponents}


            <h3>Origin Date:</h3>
            <p>{dateObj.toString()}</p>

            <h3>Location:</h3>

        </div>
    );
};

export default ViewItemComponent;
