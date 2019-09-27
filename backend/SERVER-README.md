Server.js currently supports the following requests:

To "GET" all the artifacts in the database:

    GET: localhost:3001/api/artifacts

To "GET" a specific artifact with itemid = 1234

    GET: localhost:3001/api/artifacts
    where in the message's query the item_id is included

    eg
    localhost:3001/api/artifacts?item_id=-LpcM-nohsWusv7Hf67-

    where
        "-LpcM-nohsWusv7Hf67-"
    is the artifact id stored as "id" in the database.


To enter an artifact into the database using a PUT request

    PUT: localhost:3001/api/artifacts

    Where an artifact in the following format is included in the body:


    {
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
    }
To EDIT an item in the database using PUT request:

    PUT: localhost:3001/api/artifacts

    Where an artifact in the following format is included in the body:
    id, dateAdded and dateLastModified are all required fields
    The last two can be obtained by first getting the item from the database using a GET request
    with the id
    {
            "id": "-LpcNMqpC3eyQxPTc5yv",
            "name": "editedwed.jpg",
            "description": "Photo of Sydney Opera House - with a fake/pretend actual edit",
            "ownerID": "abc123",
            "imageURL": "",
            "dateAdded": 1569413926246,
            "dateLastModified": 1569413926246,
            "originDate": 1548823080,
            "originLocation": {
                "lat": -33.855659,
                "long": 151.210553
            },
            "knownLocation": {
                "lat": -82.468636,
                "long": -87.99886
            },
            "collectionID": 2019,
            "tags": {
                "Sydney": true,
                "architecture": true,
                "photo": true
            }
    }

To add a user to the database using a PUT request:

    PUT: localhost:3001/api/users

    Where the following object is contained in the body
    {
        "name": String,
        "email": String
    }

To get a userID from the database:

    GET: localhost:3001/api/users

    where in the message's query the user's email is included as follows:

    eg
    localhost:3001/api/artifacts?email=user@email.com

    where
        "user@email.com"
    is the user's email stored in the database.