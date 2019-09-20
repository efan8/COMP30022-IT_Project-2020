import React from 'react';
import '../../style.css';

class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            loading: false,
            item: {}
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch("http://localhost:3001/api/artifacts")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    item: data
                })
            })
        console.log(this.state.item)
    }

    render() {
        const text = this.state.loading ? "loading..." : this.state.item.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}

export default Welcome;