import axios from 'axios';

var transport = axios.create({
  withCredentials: true
});

// Endpoints
const BACKEND_ROOT = "http://localhost:3001/api/"

export function refresh_transport(usingCookies) {
    if (usingCookies) {
        transport = axios.create({
          withCredentials: true
        });
    }
    else {
        transport = axios.create({
          withCredentials: false
        });
    }
}

export function get(path) {
    return new Promise(function(resolve, reject) {
        transport.get(BACKEND_ROOT + path).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        });
    });
}

export function put(path, body) {
    return new Promise(function(resolve, reject) {
        transport.put(BACKEND_ROOT + path, body).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        });
    });
}

export function post(path, body) {
    return new Promise(function(resolve, reject) {
        transport.post(BACKEND_ROOT + path, body).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        });
    });
}
