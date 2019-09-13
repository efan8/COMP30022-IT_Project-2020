import React from 'react';
import styles from '../../style.css';
import defaultImage from '../../placeholder.png';


//Ugly add item page. will need to trim into components and style accordingly
class AddItem extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            imageURL: "",
            description: "",
            tags: [],
            collectionID: "", // might be a number
            originLocation: "",
            orginDate: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name, type, value} = event.target;
        this.setState(
            {[name]: value}
        );
    }

    render() {
        return (
            <form>
                <h1 className="title">Add Item</h1>
                <h3 className="heading">Item Name:</h3>

                <input
                    name="name"
                    type="textbox"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Type item name here"
                    className="textbox"/>
                
                <img src={defaultImage}/>
                <p>Take Image | Upload Image</p>

                <h3>Description:</h3>
                <input 
                    placeholder="Simple Description of  object and stuff"
                    className="descriptionbox"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    />

                <h3>Tags:</h3>
                <button>random tag</button>

                <h3>Collection:</h3>
                <select>
                    <option value="collection1">collection1</option>
                    <option value="collection2">collection2</option>
                    <option value="collection3">collection3</option>
                    <option value="newcollection">create new collection</option>
                </select>

                <h3>Location:</h3>
                <input placeholder="CurrentLocation" />

                <h3>Origin Date:</h3>
                <input/> <button>changeDate</button>
            </form>

        )
    };
}

export default AddItem;