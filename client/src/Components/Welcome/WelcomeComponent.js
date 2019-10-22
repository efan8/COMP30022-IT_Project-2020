import React from 'react';
import { NavLink } from 'react-router-dom';
import load from '../../load.gif';

function WelcomeComponent(props){


    if (!props.state.item.data) return (
        <div className = "center" >
            <img className = "load" src={load} alt="loading..." />
        </div>
    )

    let data = props.state.item.data;
    let search = props.state.search;

    //Sorting of items
    function sortData(sortType) {
        switch(sortType) {
            case "default":
                window.location = "/Welcome";
                break;
            case "nameDesc":
                data.sort(function(a, b) {
                    var orderBool = a.name.toLowerCase() > b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;
            case "nameAsc":
                data.sort(function(a, b) {
                    var orderBool = a.name.toLowerCase() < b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;
            default:
                break;
        }
    }
    sortData(props.state.selectedOption);

    //Creates an array of all items needing to be displayed and puts them
    //into a list of items
    let items = [];
    for(let i = 0; i<data.length; i++) {
        let tags = [];
        for(let k in data[i].tags) tags.push(k.toLowerCase());
        tags = tags.join();
        if (search === "" | data[i].name.toLowerCase().includes(search)
            | data[i].description.toLowerCase().includes(search)
            | tags.includes(search)) {
            items.push(
                <div id="containerGrid">
                    <NavLink className= "toText" to={{
                        pathname:"/ViewItem",
                        aboutProps:{
                            id:`${data[i].id}`
                        }
                    }}>{data[i].name}</NavLink>
                    <div className = "thumbnail">
                        <img
                        src={ data[i].imageURLs ? data[i].imageURLs[0] : ""} 
                        alt="" className="smallImage"/>
                    </div>
                    <p className="para">Desc: {data[i].description.slice(0,18)}..</p>
                </div>
            );
        }
    }


    return(
        <div>
            <h1 className = "title"> Here are your items:</h1>
            <input 
                onChange={props.handleChange}
                type="text"
                name="search"
                placeholder="Search"
            />
            <p> Sort by:
            <select onChange={props.handleSelectChange} name="sort">
                <option value="default">--------------</option>
                <option value="nameDesc">Name A-Z</option>
                <option value="nameAsc">Name Z-A</option>
            </select>
            </p>
            <div id="center">
            <grid className = "gridDisplay">
                <React.Fragment>{items}</React.Fragment>
            </grid>
            </div>
        </div>
    );

};

export default WelcomeComponent;
