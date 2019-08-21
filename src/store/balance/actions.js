import axios from 'axios'

export function get_balance ({commit}) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.BASE_URL}/balance`)
        .then(response => {
            commit('balance', response.data.data);
            resolve(response);
        })
        .catch(err => {
            reject(err);
        })
    })
};