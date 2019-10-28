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

/*
Realtime Database - Base level functions
*/

function create(path, data) {
    var root_ref = database.ref(path);
    var item_ref = root_ref.push();
    var item_id = item_ref.key;
    
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

// Function to create user entry in Firebase Authentication, asynchronously
// returning the user ID of the new user
function create_user(user, password) {
    return new Promise(function(resolve, reject) {
        admin.auth().createUser({
            email: user.email,
            password: password,
            displayName: user.firstName + " " + user.lastName
        }).then(function(userRecord) {
            console.log('Successfully created new user:', userRecord.uid);
            resolve(userRecord.uid);
        }).catch(function(error) {
            console.log('Error creating new user:', error);
            reject(error);
        });
    });
}

/*
Firebase Storage - Base level functions
*/

// Function will return a Promise to upload a file at the given filepath to the
// Firebase Storage bucket
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
    return create_upload_promise(filepath, filename, filetype, user_id, item_id);
}


/*
Public functions
*/

// Function to add new artifact to the database
// Returns the JSON of the new entry
function add_new_artifact(json) {
    var artifact = Artifact.new(json);
    return new Promise(function(resolve, reject) {
        create(ARTIFACTS, artifact.to_firebase_JSON()).then(new_id => {
            artifact.update_id(new_id);
            resolve(artifact.to_JSON());
        });
    });
}

// Function to update the entry for an artifact in the database
// Returns the JSON of the updated entry
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

// Function to fetch an array containing all artifacts in the database
// (each in JSON form)
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

// Function to fetch the entry for an artifact in the database
// Returns the JSON of the entry
function fetch_artifact(id) {
    return new Promise(function(resolve, reject) {
        fetch(ARTIFACTS + "/" + id).then(snapshot_val => {
            var artifact = Artifact.from_firebase_json(snapshot_val, id);
            resolve(artifact.to_JSON());
        });
    });
}

// Creates a user entry in Firebase Authentication, then upon success,
// creates an entry for the user in the Realtime database, then finally
// returns the JSON entry for the user
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

// Creates a cookie for the user, given a provided idToken
function create_session_cookie(idToken) {
    return new Promise(function(resolve, reject) {
        // Set session expiration to 14 days.
        const expiresIn = 60 * 60 * 24 * 14 * 1000;
        // Create the session cookie. This will also verify the ID token in the process.
        admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
            // Set cookie policy for session cookie.
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
// Asynchronously returns the id of the user if their cookie is valid
function verify_session_cookie(req) {
    return new Promise(function(resolve, reject) {
        var sessionCookie = req.cookies ? (req.cookies.session || '') : '';
        // Verify the session cookie
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
