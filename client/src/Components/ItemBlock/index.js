import React from 'react';
import test_image from '../../test-image.jpg'


function ItemBlock(props) {
    return (
        <div>
            <img src={test_image} className="thumbnailImage"/>
            <h3 className="thumbnailHeader">Slacker</h3>
           
        </div>
    )
}

export default ItemBlock;