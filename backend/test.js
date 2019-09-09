var Artifact = require('./data.js');
var Firebase = require('./firebase.js');

var test_artifact = {
  "name": "IMG5000.jpg",
  "description": "Family portrait in front of the Sydney Opera House (photobombing pigeon in the background)",
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

Firebase.add_new_artifact(Artifact.new(test_artifact)).then(updated_artifact => {
  console.log(updated_artifact.id);
});
