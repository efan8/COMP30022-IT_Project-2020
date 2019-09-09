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

/*
Create the endpoints for artifacts only -  GET/artifacts, GET/artifacts/<ID>, PUT/artifacts/<ID>

*/

//const bodyParser = require('body-parser');
//const API_PORT = 3001;




// put method - creating item in database
router.put('/artifacts', (req,res) => {
    // Input an artifact - using firebase.js
    res.send("Putting artifact");
    const {name, description} = req.body;
    if(!name || !description) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    // Currently passing argument including artifact info, id for newly created id to be stored in and err for errors
    Firebase.add_new_artifact(req.body).then(updated_artifact_json => {
        return res.json({ success: true, data: updated_artifact_json});
    });
});



// the get method - viewing item with specific id in database
router.get('/artifacts', (req, res) => {
    res.send("Getting artifact");
    const {item_id} = req.body;
    if(!item_id) {
        // Return all items
        Firebase.fetch_all_artifacts().then(artifact_jsons => {
            return res.json({success: true, data: artifact_jsons});
        });
    }
    Firebase.fetch_artifact(item_id).then(artifact_json => {
        return res.json({success: true, data: artifact_json});
    });
});


/*


// the get method
router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res.json({success: true, data: data});
    });
});

// the update method
router.post('/updateData', (req, res) => {
    let data = new Data();

    const {id, message} = req.body;

    if ((!id && id !== 0) || !message){
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.yd = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true});
    });
});


  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });
*/


//append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
