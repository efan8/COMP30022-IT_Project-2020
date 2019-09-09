var Artifact = require('./data.js');
var Firebase = require('./firebase.js');

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

//
// Testing
//

/*Firebase.add_new_artifact(test_artifact_json).then(updated_artifact_json => {
  console.log(updated_artifact_json.id);
});*/
Firebase.fetch_artifact("-LoJV2WbBCM2Gz8vDq_H").then(artifact_json => {
  console.log(artifact_json.description);
});
Firebase.fetch_all_artifacts().then(artifact_jsons => {
  console.log(artifact_jsons);
});