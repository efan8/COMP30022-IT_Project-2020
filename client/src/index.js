/* The main App that handles the pathways of the webapp*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import LandingPage from './Components/LandingPage';
import Welcome from './Components/Welcome';
import AddItem from './Components/AddItem';
import ItemBlock from './Components/ItemBlock';
import ViewItem from './Components/ViewItem';
import AddCollection from './Components/AddCollection';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Error from './Components/Error';
import Navigation from './Components/NavigationBar';
import EditItem from './Components/EditItem';
import ViewTag from './Components/ViewTag';

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Navigation />
                        <Switch>
                            <Route path="/" component={LandingPage} exact/>
                            <Route path="/LandingPage" component={LandingPage}/>
                            <Route path="/Welcome" component={Welcome}/>
                            <Route path="/AddItem" component={AddItem}/>
                            <Route path="/ViewItem" component={ViewItem}/>
                            <Route path="/AddCollection" component={AddCollection}/>
                            <Route path="/SignUp" component={SignUp}/>
                            <Route path="/Login" component={Login}/>
                            <Route path="/ItemBlockTest" component={ItemBlock}/>
                            <Route path="/EditItem" component={EditItem}/>
                            <Route path="/ViewTag" component={ViewTag}/>
                            <Route component={Error}/>
                        </Switch>
                </div> 
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
