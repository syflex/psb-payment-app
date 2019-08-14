import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
  axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.SECRET}`;
}
