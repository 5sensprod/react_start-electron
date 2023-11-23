// Vous utilisez votre instance Axios configurée pour faire des appels API.
import axios from './axiosConfig'

export const getProducts = async () => {
  try {
    const response = await axios.get('/api/products/get-products')
    console.log('Data received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    // Afficher plus de détails si disponible
    console.error(error.response || error.message)
    throw error // Renvoyer l'erreur pour la gestion d'erreur plus haut dans le call stack
  }
}

export const addProduct = async (productData) => {
  const response = await axios.post('/api/products/add-product', productData)
  return response.data
}
