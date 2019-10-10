import React from 'react';
import EditItemComponent from './EditItemComponent';
import { blank_item } from '../../Constants/index'
import axios from 'axios';
import { get, put } from '../HTTP/http';

class EditItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            item: {},
            currentTypedTag: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTagSubmit = this.onTagSubmit.bind(this);
    }

    componentDidMount() {
        let itemId = this.props.location.aboutProps?
            this.props.location.aboutProps.id : "";
        this.setState({loading: true});
        get(`artifacts?item_id=${itemId}`)
        .then(res => {
            this.setState({
                loading: false,
                item: res.data.data
            });
        });
    }

    handleChange(event){
        const {name, value} = event.target;

        if(name == "currentTypedTag"){
            this.setState({[name]: value})
        }
        else{
            let updatedItem = {...this.state.item};
            updatedItem[name] = value;
            console.log(updatedItem)
            console.log(value)
            this.setState({
                item: updatedItem
            })
        }
        // let updatedItem = {...this.state.item};
        // updatedItem[{target}] = value;
        // console.log(updatedItem[{target}])
        // console.log(this.state);

    };

    onTagSubmit() {

        let tag = this.state.currentTypedTag;
        console.log(tag)
        this.state.item.tags[tag] = true
        console.log(this.state)
        this.setState(
            {"currentTypedTag": ""}
        )
    }

    onSubmit() {
        let body = JSON.stringify(this.state.item);

        console.log(body);
        console.log(this.state.item);
        put('artifacts', this.state.item).then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    render() {
        let display = this.state.item ? this.state.item.id : "Loading";
        return(
            <div>
                <p>display {this.state.loading ? "Loading" : this.state.item.id}</p>
                <EditItemComponent state={this.state} handleChange={this.handleChange} onSubmit={this.onSubmit} tagSubmit={this.onTagSubmit}/>
            </div>
        )
    }
}

export default EditItem;
