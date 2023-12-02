import getAxiosInstance from './axiosConfig'

export const getCompanyInfo = async () => {
  try {
    const axios = getAxiosInstance() // Obtenir l'instance actuelle d'Axios
    const response = await axios.get('/api/users/company-info')
    return response.data
  } catch (error) {
    console.error('Error fetching company info:', error)
    throw error
  }
}
