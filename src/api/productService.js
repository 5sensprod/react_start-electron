// Vous utilisez votre instance Axios configurée pour faire des appels API.
import axios from './axiosConfig'

export const getProducts = async () => {
  const response = await axios.get('/api/products/get-products')
  return response.data
}

export const addProduct = async (productData) => {
  const response = await axios.post('/api/products/add-product', productData)
  return response.data
}
