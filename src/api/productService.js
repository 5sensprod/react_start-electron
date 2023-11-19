import axios from './axiosConfig'

export const getProducts = async () => {
  const response = await axios.get('/get-products')
  return response.data
}

export const addProduct = async (productData) => {
  const response = await axios.post('/add-product', productData)
  return response.data
}
