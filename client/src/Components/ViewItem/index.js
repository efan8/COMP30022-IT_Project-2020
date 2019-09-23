/* A full display of the artifact detailing all information provided to 
   the backend */

import React from 'react';
import '../../style.css';
import Data from './testItem.json';
import ViewItemComponent from './ViewItemComponent';

class ViewItem extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {}
        };
    };

    // will put a fetch comand in to get data from api
    // Currently using a local json file.
    componentDidMount() {
        this.setState({loading: true})
        fetch("http://localhost:3001/api/artifacts?item_id=-LpBgBzsfMyY41fanxLn")
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                item: data.data
            })
            console.log(data.data) 
        })
        console.log(this.state.item ? this.state.item.id : "no")

    };

    render() {
        return(
            
            <ViewItemComponent state={this.state} />
        );
    };
};

export default ViewItem;