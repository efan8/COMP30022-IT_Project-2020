import React from 'react';
import EditItemComponent from './EditItemComponent';
import axios from 'axios';

class EditItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            item: {}
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let itemId = this.props.location.aboutProps? 
            this.props.location.aboutProps.id : "";
        this.setState({loading: true});
        fetch(`http://localhost:3001/api/artifacts?item_id=${itemId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                item: data.data
            })
            console.log(data.data) 
        })
    }

    handleChange(event){
        const {target, value} = event.target;
        let item = {...this.state.item};
        item[target] = value;
        console.log(item);
        this.setState({item})
    };

    onTagSubmit() {
        
        let tag = this.state.currentTypedTag.toString();
        console.log(tag)
        this.state.tags[tag] = true
        console.log(this.state)
        this.setState(
            {"currentTypedTag": ""}
        )
    }

    onSubmit() {
        let body = JSON.stringify(this.state.item);
        
        console.log(body);
        console.log(this.state.item);
        axios.put(`http://localhost:3001/api/artifacts`, 
            this.state.item)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    };

    render() {
        let display = this.state.item ? this.state.item.id : "Loading";
        return(
            <div>
                <p>display {this.state.loading ? "Loading" : this.state.item.id}</p>
                <EditItemComponent state={this.state} handleChange={this.handleChange} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

export default EditItem;