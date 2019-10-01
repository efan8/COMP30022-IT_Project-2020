//
// user.js
//
// File containing the model for User
//

class User {

    constructor(json) {
        this.id = json.id;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.dateJoined = json.dateJoined;
    }

    to_JSON() {
        return {
            "id": this.id,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "email": this.email,
            "dateJoined": this.dateJoined
        };
    }

    to_firebase_JSON() {
        return {
            "firstName": this.firstName,
            "lastName": this.lastName,
            "email": this.email,
            "dateJoined": this.dateJoined
        };
    }

    update_id(new_id) {
        this.id = new_id;
    }

    static create(json) {
        json.dateJoined = Date.now();
        return new User(json);
    }

    static from_firebase_json(snapshot_val, id) {
        snapshot_val.id = id;
        return new User(snapshot_val);
    }

}

module.exports = User;
