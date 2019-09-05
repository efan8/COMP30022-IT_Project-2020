var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyDlG7W2KW8AzVM-W5tOYlcrAiH9lDbzv1Y",
    authDomain: "it-project-2019sem2.firebaseapp.com",
    databaseURL: "https://it-project-2019sem2.firebaseio.com",
    projectId: "it-project-2019sem2",
    storageBucket: "",
    messagingSenderId: "240150750224",
    appId: "1:240150750224:web:b6b663108abd79251e1695"
};

// Endpoints
var ARTIFACTS = "/artifacts";
var COLLECTIONS = "/collections";
var COLLECTIONS_ARTIFACTS = "/collections-artifacts";
var COLLECTIONS_PERMISSIONS = "/collections-permissions";
var USERS = "/users";
var OWNERS_COLLECTIONS = "/owners-collections";

var test_artifact = {
  "name": "Porcelain Vase",
  "description": "Yada yada yada",
  "dateAdded": Date.now()
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function create(path, data) {
  var root_ref = database.ref(path);
  var item_ref = root_ref.push();
  var item_id = item_ref.key;
  console.log(item_id);
  return item_ref.update(data, function(error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}

function update(path, data) {
  return database.ref(path).update(data, function(error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
}

function fetch(path) {
  return database.ref(path).once('value').then(function(snapshot) {
    console.log(snapshot.val());
  });
}

//create(ARTIFACTS, test_artifact);
fetch(ARTIFACTS + "/-Lo0sGejXINPwtItJydV");
