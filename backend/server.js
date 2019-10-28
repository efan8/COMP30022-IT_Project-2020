/*
Server file for the backend that converts http messages into the required
actions by the database.
Currently using:
    localhost:3001/api
As the expected location for all http requests

Each http request is verified using cookies and any response by the backend 
will filter results to prevent access to unauthorized items 
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();

const body_parser = require('body-parser');
const formidable = require('formidable');

const Firebase = require('./firebase.js');

var cors = require('cors');
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const API_PORT = 3001;

/*
The endpoints for artifacts requests -  GET/artifacts, PUT/artifacts

*/


// put method - creating or editing item in database depending on if 
// there is an id in the item
router.put('/artifacts', (req,res) => {
    Firebase.verify_session_cookie(req)
    .then(verified_user_id => {
        if (verified_user_id) {
            // Input an artifact - using firebase.js
            const {id, name, description, ownerID } = req.body;

            if(!name || !description) {
                console.log('invalid input received');
                res.json({
                success: false,
                data: req.body,
                error: 'INVALID INPUTS'});
            }
            else if (!id) {
                console.log("adding new item");
                // update ownerID for this item - to be stored in database
                req.body.ownerID = verified_user_id;
                Firebase.add_new_artifact(req.body)
                .then(updated_artifact_json => {
                    res.json({
                    success: true,
                    data: updated_artifact_json});
                });
            }
            else {
                var permission = false;
                console.log("editing");
                Firebase.fetch_artifact(id)
                .then(artifact_json => {
                // check that ownerID of item matches the user from cookie
                // if so then update item
                    const {ownerID = "N/A" } = artifact_json;             
                    if(verified_user_id === ownerID) {
                        permission = true;
                    }
                    if(permission) {
                        Firebase.update_artifact(req.body)
                        .then(updated_artifact_json => {
                            res.json({
                            success: true,
                            data: updated_artifact_json});
                        });
                    }
                    else
                    {
                        res.json({
                            success: false,
                            data: "Access Denied"
                        });
                    }
                });            
            }
        }
        else {
            // Session cookie is unavailable or invalid. Force user to login.
            console.log("Invalid cookie");
            res.status(401).send('Access denied, user not authenticated');
        }
    });
 });

// the get method for viewing items in the database
router.get('/artifacts', (req, res) => {
    Firebase.verify_session_cookie(req)
    .then(verified_user_id => {
        if (verified_user_id) {
            console.log("Valid cookie from:" + verified_user_id);
            const item_id = req.query.item_id;
            if(!item_id) {
                console.log("Getting everything for this user: "
                                + verified_user_id);
                // GET all items for this user
                Firebase.fetch_all_artifacts()
                .then( artifacts_json => {
                    const payload = artifacts_json
                    .filter(artifact => artifact.ownerID === verified_user_id);
                        res.json({
                        success: true,
                        data: payload});
                });
            }
            else {
                // fetch this item from the database and send it to the
                // frontend if the logged in user is the item owner
                Firebase.fetch_artifact(item_id)
                .then(artifact_json => {
                    console.log('Getting: ' + item_id);
                    const {ownerID = "" } = artifact_json;
                    var payload = "Access Denied";
                    var result = false;
                    if(verified_user_id === ownerID) {
                        payload = artifact_json;
                        result = true;
                        console.log("An allowed user")
                    }
                    res.json({
                    success: result,
                    data: payload});
                });
            }
        }
        else {
            // Session cookie is unavailable or invalid. Force user to login.
            console.log("Invalid cookie");
            res.status(401).send('Access denied, user not authenticated');
        }
    });
});

/*
The endpoints for authentication requests 
PUT/signup, POST/login, GET/login_status
*/

// put method for signing a user up
router.put('/signup', (req,res) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password) {
        console.log('invalid input received');
        res.json({
            success: false,
            data: req.body,
            error: 'INVALID INPUTS'
        });
    }
    else {
        Firebase.signup_new_user(req.body)
        .then(user_json => {
            console.log('Created user: ' + user_json.id);
            res.json({
                success: true,
                data: user_json
            });
        });
    }
});

// post method for logging a user into the system
router.post('/login', (req,res) => {
    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();

    Firebase.create_session_cookie(idToken)
    .then(data => {
        res.cookie('session', data.cookie, data.options);
        res.status(200).end();
    }).catch(error => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

// get method for the frontend to check the current status of the user
router.get('/login_status', (req,res) => {
    Firebase.verify_session_cookie(req)
    .then(verified_user_id => {
        if (verified_user_id) {
            res.status(200).send("User is logged in");
        }
        else {
            res.status(401).send("User is not logged in");
        }
    });
});

/*
The endpoints for image upload
*/

router.post('/upload_image', (req,res) => {
    Firebase.verify_session_cookie(req)
    .then(verified_user_id => {
        if (verified_user_id) {
            new formidable.IncomingForm().parse(req, (err, fields, files) => {
                if (err) {
                    console.error('Error', err);
                    throw err;
                }
                var item_id = fields.item_id;
                var file = files.file;
                var filename = fields.filename;

                Firebase.upload_image(file.path, filename, file.type, 
                                                    verified_user_id, item_id)
                .then(url => {
                    res.status(200).send(url);
                })
                .catch(error => {
                    res.status(400).send("Internal error");
                });
            });
        }
        else {
            res.status(401).send("User is not logged in");
        }
    });
});


//append /api for our http requests
app.use('/api', router);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));