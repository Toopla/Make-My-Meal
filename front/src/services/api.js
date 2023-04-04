import axios from 'axios';

let api_URL = 'http://localhost:8000/';

export const get_user = async (token, id) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'users/' + id, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const get_chefs_liste = async (token) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'chefs/liste', config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_login = async (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'login', {username: username, password: password}).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_signup = async (username, password, firstname, lastname, adresse, mail, photo, role, spec) => {
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'signup', {username: username, password: password, firstname: firstname, lastname: lastname, adresse: adresse, mail: mail, photo: photo, role: role, spec: spec}).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}