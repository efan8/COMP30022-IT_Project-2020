/* Add Item form to allow user to input a new item. Currently users can
   input a name, description, tags, collection, location and origin date. 
   The data is then sent to the backend */

import React from 'react';
import '../../style.css';
import { blank_item, default_location } from '../../Constants/index';
import { check_login_status } from '../Auth/auth';
import { maxPossibleFiles } from '../../Constants/validation';

import AddItemComponent from './AddItemComponent';
import { put } from '../HTTP/http';
import { upload_images } from '../Image/image';

class AddItem extends React.Component {

    constructor() {
        super();

        this.state = blank_item;
        this.state.submitting = false;

        this.dateChange = this.dateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTagSubmit = this.onTagSubmit.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.getDataList = this.getDataList.bind(this);
        this.deleteTag = this.deleteTag.bind(this);

    };

    // date picker needs its onChange since it doesn't send an event like everything else
    dateChange(date){
        this.setState({
            "originDate": date
        });
        console.log(this.state)
    }

    // Handles updates to form values
    handleChange(event){
        console.log(event)
        const {name, value, files} = event.target;
        if(name === "choice"){
            console.log("location" + value - 1)
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
        if(maxPossibleFiles(e)){
            this.setState({ files: e.target.files });
        }
    }

    // Handles enter key to update tag values with str length validation
    keyPress(e){
        if(e.keyCode === 13 && e.target.value.length > 0){
            console.log('value', e.target.value);
            this.state.tags[e.target.value.toString()] = true
            console.log(this.state)
            this.setState(
                {"currentTypedTag": ""}
            )
        }
    }

    // Handles add tag button like keyPress function above
    onTagSubmit() {
        if(this.state.currentTypedTag.length > 0){
            let tag = this.state.currentTypedTag.toString();
            console.log(tag)
            this.state.tags[tag] = true
            console.log(this.state)
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
        let btn = document.getElementById("add-item-submit-btn");
        let spinner = document.getElementById("add-item-btn-spinner");
        console.log("submitting");

        spinner.style.display = "inline-block";
        btn.innerText = '';
        btn.disabled = true;

        // Set to default location if none is entered
        this.state.submitting = true;
        if(this.state.originLocation.lat === null){
            this.state.originLocation = default_location;
            console.log(this.state.originLocation);
        }

        let body = JSON.stringify(this.state);
        let unix = this.state.originDate.getTime();

        this.setState({
            "dateAdded": unix
        }, function() {
            var item = this.state;

            console.log(body);
            console.log(this.state);

            // Uploads artifact (item) to the database by first making an entry
            put('artifacts', this.state).then(res => {
                var artifact = res.data.data;
                var item_id = artifact.id;
                console.log("Created database entry for artifact of ID: " + item_id);
                item.id = item_id;
                item.ownerID = artifact.ownerID;
                return upload_images(this.state.files, item_id);
            })
            // Uploads the image of the artifact then navigates to the welcome page
            .then(image_urls => {
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
                spinner.style.display = "none";
                btn.innerText = "Done";
                btn.disabled = false;
                console.log(error);
            });
        });

    };

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

    // Creates the visual aspect of Add Item
    render() {
        check_login_status().then(is_logged_in => {
            if(!is_logged_in) {
                window.location = "/LandingPage";
            }
        });

        // Used to see if the input requirements are met. If so submit button is enabled.
        const isEnabled = this.state.name.length > 0 && this.state.files && this.state.files.length > 0 && this.state.description.length > 0 && !this.state.submitting;

        // Passes information to the AddItemComponent
        return(
            <div>
                <h1 className="title">Add Item</h1>
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
        );
    };
};

export default AddItem;