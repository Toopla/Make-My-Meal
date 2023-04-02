import axios from 'axios';

let api_URL = 'http://localhost:8000/';

export const get_items = async (token) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'items', config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_login = async (name, password) => {
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'login', {name: name, password: password}).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_signup = async (name, password) => {
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'signup', {name: name, password: password}).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}