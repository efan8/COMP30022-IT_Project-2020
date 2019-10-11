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
           this.handleSubmit = this.handleSubmit.bind(this);
           this.handleSelectChange = this.handleSelectChange.bind(this);
       }

       componentDidMount() {
           console.log(this.props.location ? this.props.location.aboutProps.viewTag:"");
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
   
       //Handles form submission of searchbar
       handleSubmit(event) {
           this.setState ({search: event.target.search.value.toLowerCase()});
           event.preventDefault();
       }
   
       handleSelectChange(event) {
           this.setState(
               {selectedOption: event.target[event.target.selectedIndex].value});
       }
       
   
       render() {
           return (
               <ViewTagComponent 
                   state={this.state} 
                   handleSubmit={this.handleSubmit}
                   handleSelectChange={this.handleSelectChange}/>
           )
       }
   }
   
   export default ViewTag;
   