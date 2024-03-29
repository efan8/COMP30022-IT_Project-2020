/* What is shown to the user when they access the Welcome Page */

import React from 'react';
import { NavLink } from 'react-router-dom';
import load from '../../Resources/load.gif';
import placeholderImg from "../../Resources/box.png";

function WelcomeComponent(props) {

    //If items not loaded it displays a loading page
    if (!props.state.item.data) return (
        <div className="center" >
            <img className="load" src={load} alt="loading..." />
        </div>
    )

    //Shorthand for information stored in props
    let data = props.state.item.data;
    let search = props.state.search;

    //Sorting of items dependent on selected sort
    function sortData(sortType) {
        switch (sortType) {
            case "default":
                window.location = "/Welcome";
                break;

            //Sorts alphabetically A-Z
            case "nameDesc":
                data.sort(function (a, b) {
                    var orderBool = a.name.toLowerCase() > b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;

            //Sorts alphabetically Z-A
            case "nameAsc":
                data.sort(function (a, b) {
                    var orderBool = a.name.toLowerCase() < b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;
            default:
                break;
        }
    }

    //Runs the sort function on the data based on selected sort
    sortData(props.state.selectedOption);

    //Creates an array of all items needing to be displayed and puts them
    //into a list of items
    var items = [];
    var placeholder = [];

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            //Creating tags string to for search to search through tags
            let tags = [];
            for (let k in data[i].tags) tags.push(k.toLowerCase());
            tags = tags.join();

            //Searching through name, description and tags
            if (search === "" | data[i].name.toLowerCase().includes(search)
                | data[i].description.toLowerCase().includes(search)
                | tags.includes(search)) {

                //Creating the item boxes
                items.push(

                    //Making entire item box in a clickable link to ViewItem
                    <NavLink id="containerGrid" to={{
                        pathname: "/ViewItem",
                        aboutProps: {
                            id: `${data[i].id}`
                        }
                    }}>
                        <span className="toText">{data[i].name}</span>
                        <div className="thumbnail">
                            <img
                                src={data[i].imageURLs ? data[i].imageURLs[0] : ""}
                                alt="" className="smallImage" />
                        </div>
                        <p className="grid-text">
                            {data[i].description.length > 400 ?
                                data[i].description.slice(0, 400) + ".."
                                : data[i].description}</p>
                    </NavLink>

                );
            }
        }
    }

    else {
        //What is displayed if user has no items
        placeholder.push(
            <div id="items-grid-placeholder">
                <img className="placeholder-img" src={placeholderImg}></img>
                <h1 className="placeholder-text">No artifacts added yet...</h1>
            </div>
        );
    }

    return (
        <div className="clear-page-container" onClick={props.closeNavMenu}>
            <div className="search-box">
                <div className="search-icon">
                    <img className="searchbar-icon-image" alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDEzIDMgQyA3LjQ4ODk5NzEgMyAzIDcuNDg4OTk3MSAzIDEzIEMgMyAxOC41MTEwMDMgNy40ODg5OTcxIDIzIDEzIDIzIEMgMTUuMzk2NTA4IDIzIDE3LjU5NzM4NSAyMi4xNDg5ODYgMTkuMzIyMjY2IDIwLjczNjMyOCBMIDI1LjI5Mjk2OSAyNi43MDcwMzEgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI2LjcwNzAzMSAyNS4yOTI5NjkgTCAyMC43MzYzMjggMTkuMzIyMjY2IEMgMjIuMTQ4OTg2IDE3LjU5NzM4NSAyMyAxNS4zOTY1MDggMjMgMTMgQyAyMyA3LjQ4ODk5NzEgMTguNTExMDAzIDMgMTMgMyB6IE0gMTMgNSBDIDE3LjQzMDEyMyA1IDIxIDguNTY5ODc3NCAyMSAxMyBDIDIxIDE3LjQzMDEyMyAxNy40MzAxMjMgMjEgMTMgMjEgQyA4LjU2OTg3NzQgMjEgNSAxNy40MzAxMjMgNSAxMyBDIDUgOC41Njk4Nzc0IDguNTY5ODc3NCA1IDEzIDUgeiI+PC9wYXRoPjwvc3ZnPg=="></img>
                </div>

                {/* Input box for search bar */}
                <input
                    id="search-bar-input"
                    onChange={props.handleChange}
                    type="text"
                    name="search"
                    placeholder="Search"
                />
                <div onClick={props.handleClearSearchText} id="clear-search-icon" className={"clear-search-icon inactive"}>
                    <img className="searchbar-icon-image" alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzIiIGhlaWdodD0iMzIiCnZpZXdCb3g9IjAgMCAzMiAzMiIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDcuMjE4NzUgNS43ODEyNSBMIDUuNzgxMjUgNy4yMTg3NSBMIDE0LjU2MjUgMTYgTCA1Ljc4MTI1IDI0Ljc4MTI1IEwgNy4yMTg3NSAyNi4yMTg3NSBMIDE2IDE3LjQzNzUgTCAyNC43ODEyNSAyNi4yMTg3NSBMIDI2LjIxODc1IDI0Ljc4MTI1IEwgMTcuNDM3NSAxNiBMIDI2LjIxODc1IDcuMjE4NzUgTCAyNC43ODEyNSA1Ljc4MTI1IEwgMTYgMTQuNTYyNSBaIj48L3BhdGg+PC9zdmc+"></img>
                </div>
            </div>

            {/* Drop down menu for sort */}
            <p className="sort-selector-section"> Sort by:
            <div className="sort-selector-container">
                    <select className="sort-selector" onChange={props.handleSelectChange} name="sort">
                        <option value="default">--------------</option>
                        <option value="nameDesc">Name A-Z</option>
                        <option value="nameAsc">Name Z-A</option>
                    </select>
                </div>
            </p>
            <div id="center">
                <React.Fragment>{placeholder}</React.Fragment>
                <grid className="gridDisplay">
                    {/* Displaying all items as seperate items */}
                    <React.Fragment>{items}</React.Fragment>
                </grid>
            </div>
        </div>
    );

};

export default WelcomeComponent;
