import React from 'react';
import { NavLink } from 'react-router-dom';

function WelcomeComponent(props){

    
    if (!props.state.item.data) return null;
    let data = props.state.item.data;
    let search = props.state.search;

    //Creates an array of all items needing to be displayed and puts them
    //into a list of items
    let items = [];
    for(let i = 0; i<data.length; i++) {
        if (search == "" | data[i].name.toLowerCase().includes(search) 
            | data[i].description.toLowerCase().includes(search)) {
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
                    <br></br>
                    <NavLink to={{
                        pathname:"/EditItem",
                        aboutProps:{
                            id:`${data[i].id}`
                        }
                    }} >Edit item</NavLink>
                </div>
            );
        }
    }


    return(
        <div>
            <h1 className = "title"> Here are your items:</h1>
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text" 
                    name="search" 
                    placeholder="Search"
                />
                <input type="submit"/>
            </form>
            <p>{items}</p>
        </div>
    );

};

export default WelcomeComponent;