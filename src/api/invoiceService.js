// src/api/invoiceService.js
import axios from './axiosConfig'

export const getPendingInvoices = async () => {
  try {
    const response = await axios.get('/api/pending-invoices')
    console.log('Pending invoices received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching pending invoices:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const addPendingInvoice = async (invoiceData) => {
  try {
    const response = await axios.post('/api/pending-invoices', invoiceData)
    console.log('Pending invoice added:', response.data)
    return response.data
  } catch (error) {
    console.error('Error adding pending invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const updatePendingInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(`/api/pending-invoices/${id}`, invoiceData)
    console.log('Pending invoice updated:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating pending invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const deletePendingInvoice = async (id) => {
  try {
    const response = await axios.delete(`/api/pending-invoices/${id}`)
    console.log('Pending invoice deleted:', response.data)
    return response.data
  } catch (error) {
    console.error('Error deleting pending invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}
