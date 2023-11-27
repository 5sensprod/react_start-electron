import axios from './axiosConfig'

export const getCompanyInfo = async () => {
  try {
    const response = await axios.get('/api/users/company-info')
    return response.data
  } catch (error) {
    console.error('Error fetching company info:', error)
    throw error
  }
}
