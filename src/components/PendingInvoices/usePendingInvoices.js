// src/components/PendingInvoices/usePendingInvoices.js
import { useState, useEffect } from 'react'
import {
  getPendingInvoices,
  addPendingInvoice,
  updatePendingInvoice,
  deletePendingInvoice,
} from '../../api/invoiceService'

const usePendingInvoices = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getPendingInvoices()
      .then((fetchedInvoices) => {
        setInvoices(fetchedInvoices)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  const addInvoice = async (invoiceData) => {
    try {
      const newInvoice = await addPendingInvoice(invoiceData)
      setInvoices((prevInvoices) => [...prevInvoices, newInvoice])
    } catch (err) {
      setError(err)
    }
  }

  const updateInvoice = async (id, invoiceData) => {
    try {
      await updatePendingInvoice(id, invoiceData)
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === id ? { ...invoice, ...invoiceData } : invoice,
        ),
      )
    } catch (err) {
      setError(err)
    }
  }

  const deleteInvoice = async (id) => {
    try {
      await deletePendingInvoice(id)
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== id),
      )
    } catch (err) {
      setError(err)
    }
  }

  return { invoices, addInvoice, updateInvoice, deleteInvoice, loading, error }
}

export default usePendingInvoices
