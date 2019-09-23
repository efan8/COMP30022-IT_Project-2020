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
        fetch("http://localhost:3001/api/artifacts?item_id=-LpBgBzsfMyY41fanxLn")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    item: data
                })
                console.log(data) 
            })
            console.log(this.state.item ? this.state.item.data : "no")
    }

    render() {
        const text = this.state.item.data ? this.state.item.data.name: "loading..."
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}

export default Welcome;