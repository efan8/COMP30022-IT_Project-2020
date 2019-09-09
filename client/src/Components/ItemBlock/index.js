/* Thumbnail object which displays a thumbnail image of the item in question
 * and also shows the information (name, date, description, location) of the 
 * artifact. */

import React from 'react';
import test_image from '../../test-image.jpg'


function ItemBlock(props) {
    return (
        //<img src={props.item.imageURL} className="thumbnailImage"/>
        <div>
            
            <img src={test_image} className="thumbnailImage"/>
            <h3 className="thumbnailHeader">Slacker</h3>
           
        </div>
    )
}

export default ItemBlock;