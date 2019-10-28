/* Similar to the welcome page except only displays item of one tag accessable
    via clicking on a tag on the ViewItem page */

import React from 'react';
import '../../style.css';
import ViewTagComponent from './ViewTagComponent';
import { get } from '../HTTP/http';

class ViewTag extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {},
            search: "",
            selectedOption: "",
            tag: ""
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    //Gets all artifacts that have the tag provided
    componentDidMount() {
        let viewTag = this.props.location.aboutProps ?
            this.props.location.aboutProps.viewTag : "";
        this.setState({ tag: viewTag });
        this.setState({ loading: true });
        get("artifacts")
            .then(res => {
                this.setState({
                    loading: false,
                    item: res.data
                });
            });
    }

    //Updates state when a change is made in the search bar
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value.toLowerCase();
        this.setState({ [name]: value });
    }

    //Updates state when different option in sort is selected
    handleSelectChange(event) {
        this.setState(
            { selectedOption: event.target[event.target.selectedIndex].value });
    }

    //Visual aspect of ViewTag
    render() {
        return (
            <ViewTagComponent
                state={this.state}
                handleChange={this.handleChange}
                handleSelectChange={this.handleSelectChange} />
        )
    }
}

export default ViewTag;
