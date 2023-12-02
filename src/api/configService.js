import axios from 'axios'

let currentConfig = null

export const fetchConfig = async () => {
  try {
    const response = await axios.get('/api/config')
    currentConfig = response.data
    return currentConfig
  } catch (error) {
    console.error('Error fetching configuration:', error)
    // Gérer l'erreur ou retourner une configuration par défaut
    return null
  }
}

export const getConfig = () => {
  return currentConfig
}
