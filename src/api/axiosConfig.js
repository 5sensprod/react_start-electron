import axios from 'axios'
import config from '../config.json'

let instance = createAxiosInstance(config.serverUrl)
console.log('Initial Axios base URL:', instance.defaults.baseURL)

function createAxiosInstance(baseURL) {
  return axios.create({
    baseURL,
  })
}

export const updateBaseURL = (newURL, callback) => {
  return new Promise((resolve) => {
    console.log('Updating Axios base URL to:', newURL)
    instance = createAxiosInstance(newURL) // Recréer l'instance
    callback?.() // Appeler le callback si fourni
    resolve()
  })
}

// Assigner la fonction fléchée à une variable
const getAxiosInstance = () => instance

// Exporter cette variable
export default getAxiosInstance
