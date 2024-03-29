/* Handles the logic for Editing an already established item */

import React from 'react';
import AddItemComponent from '../AddItem/AddItemComponent';
import { maxPossibleFiles } from '../../Constants/validation'
import { get, put } from '../HTTP/http';
import { upload_images } from '../Image/image';

class EditItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
        this.state.imageModified = false;
        this.state.results = {};
        this.state.selectedFile = null;
        this.state.itemLoaded = false;
        this.state.submitting = false;
        this.state.files = ["1"];

        this.dateChange = this.dateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTagSubmit = this.onTagSubmit.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.getDataList = this.getDataList.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    // date picker needs its onChange since it doesn't send an event like everything else
    dateChange(date){
        this.setState({
            "originDate": date
        });
        console.log(this.state)
    }

    // Grab the data of the already established artifact from the database
    componentDidMount() {
        let itemId = this.props.location.aboutProps?
            this.props.location.aboutProps.id : "";
        get(`artifacts?item_id=${itemId}`)
        .then(res => {
            this.setState(res.data.data);
            this.setState({
               "originDate": new Date(this.state.originDate)
            })
            this.getLocation();
            console.log(this.state)
            this.state.itemLoaded = true;

        });
    }

    // Handles updates to form values
    handleChange(event){
        const {name, value, files} = event.target;
        if(name === "choice"){
            this.setState(
                {"originLocation": {
                    "lat": this.state.results[value - 1].lat,
                    "long": this.state.results[value - 1].lon
                    }
                }
            )
        }
        // Checks to see if the number of files submitted is past the set value
        else if(name === "selectedFile"){
            if(maxPossibleFiles(event)){
                this.setState({
                    [name]: files,
                    loaded: 0
                });
            };
        }
        else{
            this.setState(
                {[name]: value}
            );
        }
        console.log(this.state)
    };

    // Validate image uploads
    handleImageUpload(e) {
        this.setState({imageModified: true});
        if(maxPossibleFiles(e)){
            this.setState({ files: e.target.files });
        }
    }

    // Handles enter key to update tag values with str length validation
    keyPress(e){
        if(e.keyCode === 13 && e.target.value.length > 0){
            console.log('value', e.target.value);
            let val = e.target.value.toString();
            let tag = new Object()
            tag[val] = true;

            this.state.tags ? this.state.tags[val] = true :
                this.setState({"tags": tag})
            console.log(this.state)
            this.setState(
                {"currentTypedTag": ""}
            )
        }
    }

    // Handles add tag button like keyPress function above
    onTagSubmit() {
        if(this.state.currentTypedTag.length > 0){
            let val = this.state.currentTypedTag.toString();
            let tag = new Object()
            tag[val] = true;

            this.state.tags ? this.state.tags[val] = true :
                this.setState({"tags": tag})
            this.setState(
                {"currentTypedTag": ""}
            )
        }

    }

    // "Deletes" tag when the tag is clicked. Just sets it to false
    deleteTag(event){
        let tagToDelete = event.target.value;
        if(tagToDelete in this.state.tags){
            let currentTags = this.state.tags;
            currentTags[tagToDelete] = false;
            this.setState({
                tags: currentTags
            })
        }
    }

    // Final form submit button which sends infomation to backend
    onSubmit() {
        if(this.state.originLocation.lat === null){
            console.log("CANT DO IT")
        }
        else{
            // Login button and its loading spinner indicator
            let btn = document.getElementById("add-item-submit-btn");
            let spinner = document.getElementById("add-item-btn-spinner");
            console.log("submitting");

            spinner.style.display = "inline-block";
            btn.innerText = '';
            btn.disabled = true;
            this.state.submitting = true;

            // Convert to unix time
            let unix = this.state.originDate.getTime();
            this.setState({
                "originDate": unix
            })

            // Send the item information to the database
            var item = this.state;
            put(`artifacts`, this.state)
            // Create database entry
            .then(res => {
                var artifact = res.data.data;
                var item_id = artifact.id;
                console.log("Updated database entry for artifact of ID: " + item_id);
                item.id = item_id;
                console.log(res);
                console.log(res.data);

                // Upload image to database if its changed
                if (this.state.imageModified) {
                    upload_images(this.state.files, item_id).then(image_urls => {
                        console.log("Uploaded images for this artifact");
                        item.imageURLs = image_urls;
                        return put('artifacts', item);
                    }).then(res => {
                        console.log(res);
                        console.log("Updated artifact entry with image_urls");
                        spinner.style.display = "none";
                        btn.innerText = "Done";
                        btn.disabled = false;
                        window.location = "/Welcome";
                    }).catch(error => {
                        console.log(error);
                        spinner.style.display = "none";
                        btn.innerText = "Done";
                        btn.disabled = false;
                    });
                }
                else {
                    spinner.style.display = "none";
                    btn.innerText = "Done";
                    btn.disabled = false;
                    window.location = "/Welcome";
                }
            }).catch(error => {
                console.log(error);
                spinner.style.display = "none";
                btn.innerText = "Done";
                btn.disabled = false;
            });
        }
    }

    // Get the locations that match the input string.
    async getDataList(){
        await fetch(`https://us1.locationiq.com/v1/search.php?key=5bbb3f798e3174&q=${this.state.locationString}&format=json`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                results: data
                })
            }
        )
    }

    // Grabs the location string so user know what loaction was previously entered.
    async getLocation(){
        console.log(this.state.originLocation)
        const {lat, long} = this.state.originLocation
        await fetch(`https://us1.locationiq.com/v1/reverse.php?key=5bbb3f798e3174&lat=${Number(lat)}&lon=${Number(long)}&format=json`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                "locationString" : data.display_name
            })
        })
    }

    // Creates the visual aspect of Edit Item
    render() {
        // Checks to see if the required infomation has been inputted.
        const isEnabled = this.state.itemLoaded && !this.state.submitting && this.state.name.length > 0 && this.state.description.length > 0;
        if(this.state.files.length == 0){
            this.state.files = ["1"];
        }

        // Passes information to the AddItemComponent
        return(
            <div>
                <h1 className="title">Edit Item</h1>
                <AddItemComponent
                    handleChange={this.handleChange}
                    handleImageUpload={this.handleImageUpload}
                    state={this.state}
                    submit={this.onSubmit}
                    tagSubmit={this.onTagSubmit}
                    keyDown={this.keyPress}
                    locationSubmit={this.getDataList}
                    deleteTag={this.deleteTag}
                    dateChange={this.dateChange}
                    isEnabled={isEnabled}
                />
            </div>
        )
    }
}

export default EditItem;
