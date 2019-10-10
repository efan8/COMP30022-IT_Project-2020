/*
Server file for the backend that converts http messages into the required
actions by the database.
Currently using:
    localhost:3001/api
As the expected location for all http requests
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();

const body_parser = require('body-parser');

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


// put method - creating item in database
router.put('/artifacts', (req,res) => {
    Firebase.verify_session_cookie(req).then(verified_user_id => {
        if (verified_user_id) {
            // Input an artifact - using firebase.js
            const {id, name, description } = req.body;
            console.log("Received a PUT request");
            //console.log(req.body);
            if(!name || !description) {
                console.log('invalid input received');
                res.json({
                success: false,
                data: req.body,
                error: 'INVALID INPUTS'});
            }
            else if (!id) {
                console.log("adding new");
                Firebase.add_new_artifact(req.body).then(updated_artifact_json => {
                    res.json({
                    success: true,
                    data: updated_artifact_json});
                });
            }
            else {
                console.log("editing");
                Firebase.update_artifact(req.body).then(updated_artifact_json => {
                    res.json({
                    success: true,
                    data: updated_artifact_json});
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

// the get method - viewing item with specific id in database
router.get('/artifacts', (req, res) => {
    Firebase.verify_session_cookie(req).then(verified_user_id => {
        if (verified_user_id) {
            console.log("Valid cookie");
            const item_id = req.query.item_id;
            if(!item_id) {
                console.log("Getting everything");
                // GET all items
                Firebase.fetch_all_artifacts().then( artifacts_json => {
                    res.json({
                    success: true,
                    data: artifacts_json});
                });
            }
            else {
                Firebase.fetch_artifact(item_id).then(artifact_json => {
                    console.log('Getting: ' + item_id);
                    res.json({
                    success: true,
                    data: artifact_json});
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
The endpoints for authentication requests - PUT/signup, POST/login, GET/login_status
*/

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
        Firebase.signup_new_user(req.body).then(user_json => {
            console.log('Created user: ' + user_json.id);
            res.json({
                success: true,
                data: user_json
            });
        });
    }
});

router.post('/login', (req,res) => {
    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();

    Firebase.create_session_cookie(idToken).then(data => {
        //res.setHeader('Cache-Control', 'private');
        console.log("setting cookie: " + data.cookie);
        res.cookie('session', data.cookie, data.options);
        //res.cookie('session', data.sessionCookie, data.options);
        res.status(200).end();
    }).catch(error => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

router.get('/login_status', (req,res) => {
    Firebase.verify_session_cookie(req).then(verified_user_id => {
        if (verified_user_id) {
            res.status(200).send("User is logged in");
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
