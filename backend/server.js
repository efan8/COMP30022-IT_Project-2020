const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');

const Firebase = require('./firebase.js')


// Not sure if still needed?
var cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_PORT = 3001;

/*
Create the endpoints for artifacts only -  GET/artifacts, GET/artifacts/<ID>, PUT/artifacts/<ID>

*/





// put method - creating item in database
router.put('/artifacts', (req,res) => {
    // Input an artifact - using firebase.js
    //res.send("Storing artifact");
    const {name, description} = req.body;
    if(!name || !description) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS'
        });
    }
    Firebase.add_new_artifact(req.body).then(updated_artifact_json => {
        return res.json({ 
            success: true, 
            data: updated_artifact_json
        });
    });
});
/*

For Testing
var test_artifact_json = {
    "name": "IMG5000.jpg",
    "description": "Photo of Sydney Opera House",
    "ownerID": "abc123",
    "originDate": 1548823080,
    "originLocation": {
      "lat": -33.855659,
      "long": 151.210553
    },
    "knownLocation": {
      "lat": -82.468636,
      "long": -87.998860
    },
    "collectionID": 2019,
    "tags": {
      "photo": true,
      "Sydney": true,
      "architecture": true
    }
  };
  
Firebase.add_new_artifact(test_artifact_json).then(updated_artifact_json => {
    console.log(updated_artifact_json.id);
  });

router.get('/', (req,res) => {
    console.log('Got a GET');
    return res.json({
        success: true,
        data : "Hello"
    })
})*/

// the get method - viewing item with specific id in database
router.get('/artifacts', (req, res) => {
    res.send("Getting artifact");
    const {item_id} = req.body;
    if(!item_id) {
        // Return all items
        Firebase.fetch_all_artifacts().then(artifact_jsons => {
            return res.json({
                success: true, 
                data: artifact_jsons
            });
        });
    }
    Firebase.fetch_artifact(item_id).then(artifact_json => {
        return res.json({
            success: true, 
            data: artifact_json
        });
    });
});






//append /api for our http requests
app.use('/api', router);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });




// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
