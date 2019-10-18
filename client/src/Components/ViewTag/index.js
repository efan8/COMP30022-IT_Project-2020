/* A welcome page for the user after logging in where all their items are
   displayed */

   import React from 'react';
   import '../../style.css';
   import ViewTagComponent from './ViewTagComponent';
   import { get } from '../HTTP/http';
   
   class ViewTag extends React.Component{
       
   
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

       componentDidMount() {
           let viewTag = this.props.location.aboutProps?
           this.props.location.aboutProps.viewTag : "";
           this.setState({tag: viewTag});
           //this.setState({tag: viewTag});
           this.setState({loading: true});
           get("artifacts")
               .then(res => {
                   this.setState({
                       loading: false,
                       item: res.data
                   });
               });
       }
   
       handleChange(event) {
            let name = event.target.name;
            let value = event.target.value.toLowerCase();
            this.setState({[name]: value});
        }
   
       handleSelectChange(event) {
           this.setState(
               {selectedOption: event.target[event.target.selectedIndex].value});
       }
       
       render() {
           return (
               <ViewTagComponent 
                   state={this.state} 
                   handleChange={this.handleChange}
                   handleSelectChange={this.handleSelectChange}/>
           )
       }
   }
   
   export default ViewTag;
   