import axios from 'axios'

export function get_balance ({commit}) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.paystack.co/balance')
        .then(response => {
            commit('balance', response.data.data);
            resolve(response);
        })
        .catch(err => {        
            reject(err);
        })
    })
};