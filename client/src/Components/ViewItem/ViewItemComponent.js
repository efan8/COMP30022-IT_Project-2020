import React from 'react';
import { NavLink } from 'react-router-dom';
import load from '../../load.gif';

function ViewItemComponent(props){

    if (!props.state.item) return (
        <div className = "center" >
            <img className = "load" src={load} alt="loading..." />
        </div>
    )

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
    const tagComponents = keys.map(key => <div><NavLink to={{
        pathname:"/ViewTag",
        aboutProps:{
            viewTag : key
        }
    }} >{key}</NavLink>
    <br></br></div>)


    const {originLocation} = props.state.item;
    const {lat, long} = originLocation ? originLocation : "";
    console.log(lat, long);


    let dateObj = new Date(props.state.item.originDate);


    return(
        <div className="solid-page-container-with-margin">
            <span className="item-image-container">
                <img src={props.state.item.imageURLs ? props.state.item.imageURLs[0] : ""} alt="" className="item-image"/>
            </span>
            <h1 className="view-item-title">{props.state.item.name}</h1>
            <br></br>
            <NavLink className="editItem" to={{
                pathname:"/EditItem",
                aboutProps:{
                    id:`${props.state.item.id}`
                }
            }} >Edit item</NavLink>

            <h3>Description:</h3>
            <p className="view-item-text-container">{props.state.item.description}</p>


            <h3>Tags:</h3>
            {tagComponents}


            <h3>Origin Date:</h3>
            <p className="view-item-text-container">{dateObj.toString()}</p>

            <h3>Location:</h3>
            <div className="mapSpace"></div>
        </div>
    );
};

export default ViewItemComponent;
