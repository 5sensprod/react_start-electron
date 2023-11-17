import { useState, useCallback } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'
import productSchema from '../schemas/productSchema'

const useProductCategory = () => {
  const [categories, setCategories] = useState([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [productData, setProductData] = useState(
    Object.keys(productSchema).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {}),
  )

  // Function to reset form to initial state
  const resetForm = useCallback(() => {
    setProductData(
      Object.keys(productSchema).reduce((acc, key) => {
        acc[key] = ''
        return acc
      }, {}),
    )
    setSelectedCategoryId('')
    setNewCategoryName('')
  }, [])

  // Function to submit a new category
  const handleCategorySubmit = useCallback(() => {
    return new Promise((resolve, reject) => {
      ipcRendererHelper.send('add-category', { name: newCategoryName })
      ipcRendererHelper.once('category-add-success', (event, newCategory) => {
        setCategories((prev) => [...prev, newCategory])
        resolve(newCategory)
      })
      ipcRendererHelper.once('category-add-error', reject)
    })
  }, [newCategoryName])

  // Function to submit a new product
  const handleProductSubmit = useCallback(
    (categoryId) => {
      if (Object.keys(productData).length) {
        ipcRendererHelper.send('add-product', { ...productData, categoryId })
        resetForm()
      }
    },
    [productData, resetForm],
  )

  return {
    categories,
    productData,
    newCategoryName,
    selectedCategoryId,
    setProductData,
    setNewCategoryName,
    setSelectedCategoryId,
    resetForm,
    handleCategorySubmit,
    handleProductSubmit,
  }
}

export default useProductCategory
