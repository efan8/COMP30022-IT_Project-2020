import React from 'react';
import { NavLink } from 'react-router-dom';

function WelcomeComponent(props){
    if (!props.state.item.data) return null;
    let data = props.state.item.data;

    // Gets the tag names from the json file
    let items = [];
    for(let i = 0; i<data.length; i++) {
        items.push(
            <div>
                <h1>{data[i].name}</h1>
                <img src={data[i].imageURL} alt="" className="smallImage"/>
                <p className="para">{data[i].description}</p>
                <NavLink to={{
                    pathname:"/ViewItem",
                    aboutProps:{
                        id:`${data[i].id}`
                    }
                }} >Link to item</NavLink>
                <p >edit item</p >
            </div>
        );
    }

    
    return(
        <div>
            <h1 className = "title "> Here are your items:</h1>
            <p>{items}</p>
        </div>
    );

};

export default WelcomeComponent;