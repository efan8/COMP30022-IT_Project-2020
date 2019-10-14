var admin = require("firebase-admin");
var Artifact = require('./model/artifact.js');
var User = require('./model/user.js');

// Initialize Firebase
var serviceAccount = require("./config/firebaseServiceAccountKey.json");
const storage_bucket_url = "gs://it-project-2019sem2.appspot.com";
const storage_bucket_download_url = "https://firebasestorage.googleapis.com/v0/b/it-project-2019sem2.appspot.com/o";

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://it-project-2019sem2.firebaseio.com",
  storageBucket: storage_bucket_url
});

var database = admin.database();
var storage = admin.storage();

// Endpoints
var ARTIFACTS = "/artifacts";
var COLLECTIONS = "/collections";
var COLLECTIONS_ARTIFACTS = "/collections-artifacts";
var COLLECTIONS_PERMISSIONS = "/collections-permissions";
var USERS = "/users";
var OWNERS_COLLECTIONS = "/owners-collections";

var test_artifact = {
    "name": "IMG123.jpg",
    "description": "Family portrait in front of the Louvre (photobombing pigeon in the background)",
    "ownerID": "abc123",
    "originDate": 1532084700,
    "originLocation": {
        "lat": 48.860809,
        "long": 2.336722
    },
    "knownLocation": {
        "lat": -82.468636,
        "long": -87.998860
    },
    "collectionID": 2019,
    "tags": {
        "photo": true,
        "Paris": true,
        "family": true
    }
};

/*
Realtime Database - Base level functions
*/

function create(path, data) {
    var root_ref = database.ref(path);
    var item_ref = root_ref.push();
    var item_id = item_ref.key;
    console.log(item_id);

    return new Promise(function(resolve, reject) {
        item_ref.set(data, function(error) {
            if (error) {
                console.log("Error: " + error);
                reject(error);
            } else {
                // Data saved successfully!
                resolve(item_id);
            }
        });
    });
}

function update(path, data) {
  return new Promise(function(resolve, reject) {
    database.ref(path).update(data, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

function fetch(path) {
    return new Promise(function(resolve, reject) {
        database.ref(path).once('value').then(function(snapshot) {
            resolve(snapshot.val());
        });
    });
}

/*
Realtime Database - Helper functions
*/

function add_user_to_database(user) {
    return new Promise(function(resolve, reject) {
        update(USERS + "/" + user.id, user.to_firebase_JSON()).then(did_update => {
            if (did_update) {
                resolve(user.to_JSON());
            }
            else {
                reject("Failed to add user to database");
            }
        });
    });
}

/*
Firebase Authentication - Base level functions
*/

function create_user(user, password) {
    return new Promise(function(resolve, reject) {
        admin.auth().createUser({
            email: user.email,
            password: password,
            displayName: user.firstName + " " + user.lastName
        }).then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            resolve(userRecord.uid);
        }).catch(function(error) {
            // Need to handle error specifically
            //
            console.log('Error creating new user:', error);
            reject(error);
        });
    });
}

/*
Firebase Storage - Base level functions
*/

function create_upload_promise(filepath, filename, filetype, user_id, item_id) {
    return new Promise(function(resolve, reject) {
        let unique_filepath = user_id + "/" + item_id + "/" + filename;
        let download_filepath = user_id + "%2F" + item_id + "%2F" + filename + "?alt=media";
        let url = storage_bucket_download_url + "/" + download_filepath;
        console.log(unique_filepath);
        var bucket = storage.bucket();
        const options = {
            destination: unique_filepath,
            metadata: {
                contentType: filetype
            }
        };
        bucket.upload(filepath, options, function(err, newFile) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(url);
            }
        });
    });
}

// Function will asynchronously return an array containing the filepath (ie. URL) of each uploaded image
function upload_image(filepath, filename, filetype, user_id, item_id) {
    /*let chain = Promise.resolve();
    // Upload images
    for (let filepath of filepaths) {
        chain = chain.then(uploaded_filepaths => create_upload_promise(filepath, filename, user_id, item_id));
    }
    return chain;*/
    return create_upload_promise(filepath, filename, filetype, user_id, item_id);
}


/*
Public functions
*/

function add_new_artifact(json) {
    var artifact = Artifact.new(json);
    return new Promise(function(resolve, reject) {
        create(ARTIFACTS, artifact.to_firebase_JSON()).then(new_id => {
            artifact.update_id(new_id);
            resolve(artifact.to_JSON());
        });
    });
}

function update_artifact(json) {
    var artifact = Artifact.updated(json);
    return new Promise(function(resolve, reject) {
        update(ARTIFACTS + "/" + artifact.id, artifact.to_firebase_JSON()).then(did_update => {
            if (did_update) {
                resolve(artifact.to_JSON());
            }
            else {
                reject("Failed to update");
            }
        });
    });
}

function fetch_all_artifacts() {
    return new Promise(function(resolve, reject) {
        fetch(ARTIFACTS).then(artifacts_snapshot => {
            var artifact_jsons = [];
            for (var id in artifacts_snapshot) {
                artifact_jsons.push(Artifact.from_firebase_json(artifacts_snapshot[id], id).to_JSON());
            }
            resolve(artifact_jsons);
        });
    });
}

function fetch_artifact(id) {
    return new Promise(function(resolve, reject) {
        fetch(ARTIFACTS + "/" + id).then(snapshot_val => {
            var artifact = Artifact.from_firebase_json(snapshot_val, id);
            resolve(artifact.to_JSON());
        });
    });
}

function signup_new_user(json) {
    return new Promise(function(resolve, reject) {
        var user = User.create(json);
        create_user(user, json.password).then(user_id => {
            user.update_id(user_id);
            return add_user_to_database(user);
        }).then(user_json => {
            resolve(user_json);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

function create_session_cookie(idToken) {
    return new Promise(function(resolve, reject) {
        // Set session expiration to 14 days.
        const expiresIn = 60 * 60 * 24 * 14 * 1000;
        // Create the session cookie. This will also verify the ID token in the process.
        // The session cookie will have the same claims as the ID token.
        // To only allow session cookie setting on recent sign-in, auth_time in ID token
        // can be checked to ensure user was recently signed in before creating a session cookie.
        admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
            // Set cookie policy for session cookie.
            console.log("Session cookie: " + sessionCookie);
            const options = {maxAge: expiresIn, httpOnly: false, secure: false };
            const data = {
                cookie: sessionCookie,
                options: options
            };
            resolve(data);
        }, error => {
            console.log(error);
            reject(error);
        });
    });
}

// Function to verify the session cookie of the HTTP request is valid
function verify_session_cookie(req) {
    return new Promise(function(resolve, reject) {
        var sessionCookie = req.cookies ? (req.cookies.session || '') : '';
        console.log("Cookie: " + sessionCookie);
        // Verify the session cookie. In this case an additional check is added to detect
        // if the user's Firebase session was revoked, user deleted/disabled, etc.
        admin.auth().verifySessionCookie(
            sessionCookie, true /** checkRevoked */)
            .then((decodedClaims) => {
                console.log("User ID: " + decodedClaims.uid)
                resolve(decodedClaims.uid);
            }).catch(error => {
                // Session cookie is unavailable or invalid. User must re-login.
                resolve(null);
            });
    });
}


/*
Exports
*/

module.exports.upload_image = upload_image;
module.exports.add_new_artifact = add_new_artifact;
module.exports.update_artifact = update_artifact;
module.exports.fetch_artifact = fetch_artifact;
module.exports.fetch_all_artifacts = fetch_all_artifacts;
module.exports.signup_new_user = signup_new_user;
module.exports.create_session_cookie = create_session_cookie;
module.exports.verify_session_cookie = verify_session_cookie;
