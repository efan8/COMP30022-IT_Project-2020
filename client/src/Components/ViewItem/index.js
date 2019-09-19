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
        this.setState({loading:true})
        // fetch("api website")
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({
        //         item: data
        //     })
        // })
        this.setState({
            loading: false,
            item: Data
        });

    };

    render() {
        return(
            <ViewItemComponent state={this.state} />
        );
    };
};

export default ViewItem;