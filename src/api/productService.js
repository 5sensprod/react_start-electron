import getAxiosInstance from './axiosConfig'

export const getProducts = async () => {
  try {
    const axios = getAxiosInstance() // Obtenir l'instance actuelle d'Axios
    const response = await axios.get('/api/products/get-products')
    console.log('Data received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const addProduct = async (productData) => {
  const axios = getAxiosInstance() // Obtenir l'instance actuelle d'Axios
  const response = await axios.post('/api/products/add-product', productData)
  return response.data
}
