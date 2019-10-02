/* A full display of the artifact detailing all information provided to
   the backend */

import React from 'react';
import '../../style.css';
import Data from './testItem.json';
import ViewItemComponent from './ViewItemComponent';
import MapMaker from '../MapMaker';
import axios from 'axios';

const transport = axios.create({
  withCredentials: true
});

class ViewItem extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {}
        };
        this.map = <MapMaker />
        this.componentDidMount = this.componentDidMount.bind(this);
    };


    // will put a fetch comand in to get data from api
    // Currently using a local json file.
    componentDidMount() {
        let itemId = this.props.location.aboutProps?
            this.props.location.aboutProps.id : "";
        console.log("Item ID: " + itemId);
        this.setState({loading: true});
        transport.get(`http://localhost:3001/api/artifacts?item_id=${itemId}`)
        .then(res => {
            this.setState({
                loading: false,
                item: res.data
            })
            console.log(res.data)
        })
        console.log(this.state.item ? this.state.item.id : "no")
    };

    render() {
        // update map
        if(this.state.item.originLocation){
            this.map = <MapMaker location={this.state.item.originLocation}/>
        }
        return(
            <div>
                <ViewItemComponent state={this.state} />
                {this.map}
            </div>
        );
    };
};

export default ViewItem;
