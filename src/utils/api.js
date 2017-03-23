import axios from 'axios';

const API_URL = 'http://node-hnapi.herokuapp.com';

const hnapi = {
  getTopStories: () => {
    return axios.get(`${API_URL}/news`)
  },
  getItem: (id) => {
    return axios.get(`${API_URL}/item/${id}`)
  },
  getUser: (username) => {
    return axios.get(`${API_URL}/user/${username}`)
  }
}

export default hnapi;
