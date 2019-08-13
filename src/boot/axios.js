import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios;
  axios.defaults.headers.common['Authorization'] = `Bearer sk_test_eaa2518cbcfbd9ba28c6d984895b401930e0484e`;
}
