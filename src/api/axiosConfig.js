// axiosConfig.js
import axios from 'axios'
import config from '../config.json'

const instance = axios.create({
  baseURL: config.serverUrl,
})

export const updateBaseURL = (newURL) => {
  instance.defaults.baseURL = newURL
}

export default instance
