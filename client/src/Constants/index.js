
// hard coded to work with edit item when a new item is created. To fix we should remove known location, work out ownerID and remove collectionID too.
export const blank_item = {
    "id": "",
    "name": "",
    "description": "",
    "ownerID": "abc123",
    "originDate": new Date(),
    "originLocation": {
        "lat": null,
        "long": null
    },
    "knownLocation": {
        "lat": 0,
        "long": 0
    },
    "collectionID": 0,
    "tags": {},
    "currentTypedTag": "",
    "locationString": "",
    "results": {},
    "selectedFile": null
};
export const default_location = {
    "lat": -37.814,
    "long": 144.96332
}
export const blank_collection = {
    "id": "",
    "name": "",
    "description": "",
    "ownerID": "",
    "dateCreated": "",
    "dateLastModified": ""
};
