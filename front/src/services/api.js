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

export const get_reservation_client = async (token, id_utilisateur) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'reservation/' + id_utilisateur, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const get_reservation_chef = async (token, id_utilisateur) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'reservation/' + id_utilisateur, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_reservation = async (token, id_client, id_chef, name_chef, name_client, adresse, jour, creneau, photo) => {
    const config = {headers: {Authorization: 'Bearer ' + token}};
    const body = {id_client: id_client, id_chef: id_chef, name_chef: name_chef, name_client: name_client, adresse: adresse, jour: jour, creneau: creneau, photo: photo};
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'reservation', body, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const delete_reservation = async (token, id_client, id) => {
    const config = {headers: {Authorization: 'Bearer ' + token}};
    return new Promise((resolve, reject) => {
        axios.delete(api_URL + 'reservation/' + id_client + '/' + id, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const get_planning_chef = async (token, id_utilisateur) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    return new Promise((resolve, reject) => {
        axios.get(api_URL + 'planning/' + id_utilisateur, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const post_planning = async (token, id_chef, jour, petit_dejeuner, dejeuner, gouter, repas) => {
    const config = {headers: {Authorization: 'Bearer ' + token}};
    const body = {id_chef: id_chef, jour: jour, petit_dejeuner: petit_dejeuner, dejeuner: dejeuner, gouter: gouter, repas: repas};
    return new Promise((resolve, reject) => {
        axios.post(api_URL + 'planning', body, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const put_planning = async (token, id_chef, id, petit_dejeuner, dejeuner, gouter, repas) => {
    const config = {headers: {Authorization: 'Bearer ' + token}};
    const body = {petit_dejeuner: petit_dejeuner, dejeuner: dejeuner, gouter: gouter, repas: repas};
    return new Promise((resolve, reject) => {
        axios.put(api_URL + 'planning/' + id_chef + '/' + id, body, config).then(response => {
            let data = response.data;
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

export const delete_planning = async (token, id_chef, id) => {
    const config = {headers: {Authorization: 'Bearer ' + token}};
    return new Promise((resolve, reject) => {
        axios.delete(api_URL + 'planning/' + id_chef + '/' + id, config).then(response => {
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