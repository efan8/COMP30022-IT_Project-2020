import React from 'react';
import { NavLink } from 'react-router-dom';

function ViewTagComponent(props){

    
    if (!props.state.item.data ) return (
        <div>
            <h1 className = "title"> Loading</h1>
            <h1>You have no items.</h1>
        </div>
    )
    
    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let data = props.state.item.data;
    let search = props.state.search;
    let tag = props.state.tag;

    //Sorting of items
    //Old and new case are kinda broken need to fix
    function sortData(sortType) {
        switch(sortType) {
            case "default":
                window.location = "/Welcome";
                break;
            // case "old":
            //     data.sort(function(a, b) {
            //         var orderBool = a.dataAdded > b.dataAdded;
            //         return orderBool ? 1 : -1;
            //     });
            //     break;
            // case "new":
            //     data.sort(function(a, b) {
            //         var orderBool = a.dataAdded < b.dataAdded;
            //         return orderBool ? 1 : -1;
            //     });
            //     break;
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
        for(let k in data[i].tags) tags.push(k);
        let tagsString = tags.join();
        if (tags.includes(tag)) {
            if (search == "" | data[i].name.toLowerCase().includes(search) 
                | data[i].description.toLowerCase().includes(search)
                | tagsString.includes(search)) {
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
    }


    return(
        <div>
            <h1 className = "title"> {capitalise(tag)}</h1>
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text" 
                    name="search" 
                    placeholder="Search"
                />
                <input type="submit"/>
                <p> Sort by:
                <select onChange={props.handleSelectChange} name="sort">
                    <option value="default">--------------</option>
                    {/* <option value="old">Oldest</option>
                    <option value="new">Newest</option> */}
                    <option value="nameDesc">Name A-Z</option>
                    <option value="nameAsc">Name Z-A</option>
                </select>
                </p>
            </form>
            <p>{items}</p>
        </div>
    );

};

export default ViewTagComponent;