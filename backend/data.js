//
// Data.js
//
// File containing the model for the backend
//

class Artifact {

  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.ownerID = json.ownerID;
    this.imageURL = json.imageURL;
    this.dateAdded = json.dateAdded;
    this.dateLastModified = json.dateLastModified;
    this.originDate = json.originDate;
    this.originLocation = json. originLocation;
    this.knownLocation = json.knownLocation;
    this.collectionID = json.collectionID;
    this.tags = json.tags;
  }

  to_JSON() {
    return {
      "id": this.id,
      "name": this.name,
      "description": this.description,
      "ownerID": this.ownerID,
      "imageURL": this.imageURL,
      "dateAdded": this.dateAdded,
      "dateLastModified": this.dateLastModified,
      "originDate": this.originDate,
      "originLocation": this.originLocation,
      "knownLocation": this.knownLocation,
      "collectionID": this.collectionID,
      "tags": this.tags
    };
  }

  to_firebase_JSON() {
    return {
      "name": this.name,
      "description": this.description,
      "ownerID": this.ownerID,
      "imageURL": this.imageURL || "",
      "dateAdded": this.dateAdded,
      "dateLastModified": this.dateLastModified,
      "originDate": this.originDate,
      "originLocation": this.originLocation,
      "knownLocation": this.knownLocation,
      "collectionID": this.collectionID,
      "tags": this.tags
    };
  }

  update_id(new_id) {
    this.id = new_id;
  }

  static new(json) {
    json.dateAdded = Date.now();
    json.dateLastModified = Date.now();
    return new Artifact(json);
  }

  static updated(json) {
    json.dateLastModified = Date.now();
    return new Artifact(json);
  }

  static from_firebase_json(snapshot_val, id) {
    snapshot_val.id = id;
    return new Artifact(snapshot_val);
  }

}

module.exports = Artifact;
