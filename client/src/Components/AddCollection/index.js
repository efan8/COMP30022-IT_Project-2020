/* Adding new collection  */
   
   import React from 'react';
   import '../../style.css';
   import { blank_collection } from '../../Constants/index'
   
   import AddCollectionComponent from './AddCollectionComponent';
   import axios from 'axios';
   
   
   class AddCollection extends React.Component {
   
       constructor() {
           super();
           
           this.state = blank_collection;
           this.handleChange = this.handleChange.bind(this);
           this.onSubmit = this.onSubmit.bind(this);
       };
   
       handleChange(event){
           const {name, value} = event.target;
           this.setState(
               {[name]: value}
           );
       };
   
   
       onSubmit() {
           let body = JSON.stringify(this.state);
           console.log(body);
           console.log(this.state);
           axios.put(`http://localhost:3001/api/artifacts`, 
               this.state)
           .then(res => {
               console.log(res);
               console.log(res.data);
           })
       };
   
       render() {
           return(
               <div>
                   <AddCollectionComponent 
                       handleChange={this.handleChange} 
                       state={this.state}
                       submit={this.onSubmit}
                   />
               </div> 
               
           );
           
       };
   };
   
   export default AddCollection;