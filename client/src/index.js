import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './Components/Welcome';
import Additem from './Components/AddItem';
import ItemBlock from './Components/ItemBlock';
import ViewItem from './Components/ViewItem';

function App() {
    // return(
    //     <div>
    //         <Welcome />
    //         <Additem />
    //         <br></br>
    //         <ItemBlock />
    //     </div>
    // )
    return(
        <div>
            <ItemBlock />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
