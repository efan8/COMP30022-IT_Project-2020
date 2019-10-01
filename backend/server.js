/*
Server file for the backend that converts http messages into the required
actions by the database.
Currently using:
    localhost:3001/api
As the expected location for all http requests
*/

const express = require('express');
const app = express();
const router = express.Router();

const body_parser = require('body-parser');

const Firebase = require('./firebase.js');

var cors = require('cors');
app.use(cors());

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const API_PORT = 3001;

/*
The endpoints for artifacts requests -  GET/artifacts, PUT/artifacts

*/


// put method - creating item in database
router.put('/artifacts', (req,res) => {
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
 });




// the get method - viewing item with specific id in database
router.get('/artifacts', (req, res) => {
    verify_session_cookie(req).then(is_valid_cookie => {
        if (is_valid_cookie) {
            console.log("Valid cookie");
        }
        else {
            // Session cookie is unavailable or invalid. Force user to login.
            console.log("Invalid cookie");
        }
        const item_id = req.query.item_id;
        //console.log(req);
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
    });
});

/*
The endpoints for authentication requests - PUT/signup, POST/login
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

    // Set session expiration to 30 days.
    const expiresIn = 60 * 60 * 24 * 30 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({status: 'success'}));
    }, error => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

/*
Helper functions
*/

// Function to verify the session cookie of the HTTP request is valid
function verify_session_cookie(req) {
    return new Promise(function(resolve, reject) {
        const sessionCookie = req.cookies.session || '';
        // Verify the session cookie. In this case an additional check is added to detect
        // if the user's Firebase session was revoked, user deleted/disabled, etc.
        admin.auth().verifySessionCookie(
            sessionCookie, true /** checkRevoked */)
            .then((decodedClaims) => {
                resolve(true);
            }).catch(error => {
                // Session cookie is unavailable or invalid. User must re-login.
                resolve(false);
            });
    });
}


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
