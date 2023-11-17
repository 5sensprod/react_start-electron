import React, { useState, useEffect, useCallback } from 'react'
import ProductForm from './product/ProductForm'
import CategoryForm from './category/CategoryForm'
import { ipcRendererHelper } from './utils/ipcRenderer'

const ProductCategoryForm = () => {
  const [categories, setCategories] = useState([])
  const [productData, setProductData] = useState({})
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')

  useEffect(() => {
    ipcRendererHelper.send('get-categories')
    ipcRendererHelper.on('categories-data', (event, categoriesData) => {
      setCategories(categoriesData)
    })

    return () => {
      ipcRendererHelper.removeAllListeners('categories-data')
      ipcRendererHelper.removeAllListeners('category-add-success')
      ipcRendererHelper.removeAllListeners('product-add-success')
      ipcRendererHelper.removeAllListeners('category-add-error')
      ipcRendererHelper.removeAllListeners('product-add-error')
    }
  }, [])

  useEffect(() => {
    ipcRendererHelper.on('category-add-success', (event, newCategory) => {
      setCategories((prevCategories) => [...prevCategories, newCategory])
      setSelectedCategoryId(newCategory._id) // Save the new category id
    })

    ipcRendererHelper.on('product-add-success', (event, newProduct) => {
      console.log('Product added successfully:', newProduct)
      setProductData({}) // Clear the product form upon success
      setSelectedCategoryId('') // Reset selected category id
    })

    // Handle errors here (not shown for brevity)
  }, [])

  const handleProductDataChange = useCallback((newProductData) => {
    setProductData(newProductData)
  }, [])

  const handleCategoryChange = useCallback((name) => {
    setNewCategoryName(name)
  }, [])

  const handleCategorySubmit = useCallback(() => {
    ipcRendererHelper.send('add-category', { name: newCategoryName })
  }, [newCategoryName])

  const handleProductSubmit = useCallback(() => {
    if (Object.keys(productData).length > 0) {
      // Make sure to include the categoryId in the product data
      ipcRendererHelper.send('add-product', {
        ...productData,
        categoryId: selectedCategoryId,
      })
    }
  }, [productData, selectedCategoryId])

  // This function now only updates the newCategoryName and selectedCategoryId when a new
  // category is added, it doesn't automatically send the product data
  const handleSubmit = useCallback(() => {
    if (newCategoryName) {
      handleCategorySubmit()
      setNewCategoryName('') // Clear the category input
    }

    handleProductSubmit()
  }, [handleCategorySubmit, handleProductSubmit, newCategoryName])

  return (
    <div>
      <h1>Gestion des Produits et Catégories</h1>
      <CategoryForm onCategoryChange={handleCategoryChange} />
      <ProductForm onProductDataChange={handleProductDataChange} />
      <button onClick={handleSubmit}>Soumettre</button>
    </div>
  )
}

export default ProductCategoryForm
