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
            }} >
                <svg className="button-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"/>
                </svg>
                <span>Edit item</span>
            </NavLink>
            <br></br>
            <br></br>
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
