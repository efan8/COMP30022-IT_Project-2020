import React from 'react';
import ReactDOM from 'react-dom';

//npm install --save react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import LandingPage from './Components/LandingPage';
import Welcome from './Components/Welcome';
import AddItem from './Components/AddItem';
import ItemBlock from './Components/ItemBlock';
import ViewItem from './Components/ViewItem';
import SignUp from './Components/SignUp';
import Error from './Components/Error';
import Navigation from './Components/Navigation';


 

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={LandingPage} exact/>
             <Route path="/Welcome" component={Welcome}/>
             <Route path="/AddItem" component={AddItem}/>
             <Route path="/ViewItem" component={ViewItem}/>
             <Route path="/SignUp" component={SignUp}/>
             <Route path="/ItemBlockTest" component={ItemBlock}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
