// src/api/invoiceService.js
import axios from './axiosConfig'

export const getInvoices = async () => {
  try {
    const response = await axios.get('/api/invoices')
    console.log('Invoices received:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching invoices:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const addInvoice = async (invoiceData) => {
  try {
    const response = await axios.post('/api/invoices', invoiceData)
    console.log('Invoice added:', response.data)
    return response.data
  } catch (error) {
    console.error('Error adding invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(`/api/invoices/${id}`, invoiceData)
    console.log('Invoice updated:', response.data)
    return response.data
  } catch (error) {
    console.error('Error updating pending invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`/api/invoices/${id}`)
    console.log('Invoice deleted:', response.data)
    return response.data
  } catch (error) {
    console.error('Error deleting invoice:', error)
    console.error(error.response || error.message)
    throw error
  }
}
