import { get, put, post, clear_cookies } from "../HTTP/http";
import * as firebase from "firebase/app";
import "firebase/auth";

// Endpoints
const SIGNUP = "signup";
const LOGIN = "login";
const LOGIN_STATUS = "login_status";

const firebaseConfig = {
    apiKey: "AIzaSyDlG7W2KW8AzVM-W5tOYlcrAiH9lDbzv1Y",
    authDomain: "it-project-2019sem2.firebaseapp.com",
    databaseURL: "https://it-project-2019sem2.firebaseio.com",
    projectId: "it-project-2019sem2",
    storageBucket: "",
    messagingSenderId: "240150750224",
    appId: "1:240150750224:web:b6b663108abd79251e1695"
};

firebase.initializeApp(firebaseConfig);

export function signup(user) {
    return new Promise(function(resolve, reject) {
        put(SIGNUP, user).then(res => {
            resolve(res);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export function login(email, password) {
    return new Promise(function(resolve, reject) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user_credential => {
            console.log("signed in");
            console.log(user_credential);
            console.log(user_credential.user ? user_credential.user.getIdToken() : "null");
            // Get the user's ID token as it is needed to exchange for a session cookie.
            return user_credential.user.getIdToken();
        }).then(idToken => {
            console.log("ID Token: " + idToken);
            // Session login endpoint in backed is queried and the session cookie is set.
            return post(LOGIN, { "idToken": idToken });
        }).then(() => {
            // A page redirect would suffice as the persistence is set to NONE.
            return firebase.auth().signOut();
        }).then(() => {
            console.log("Signed in!");
            resolve(true);
        }).catch(function(error) {
            console.log(error);
            reject(error);
        });
    });
}

export function logout() {
    return new Promise(function(resolve, reject) {
        clear_cookies();
        resolve(true);
    });
}

export function check_login_status() {
    return new Promise(function(resolve, reject) {
        get(LOGIN_STATUS).then(res => {
            if (res.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}
