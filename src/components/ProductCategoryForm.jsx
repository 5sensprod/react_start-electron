import React, { useState, useEffect, useCallback } from 'react'
import ProductForm from './product/ProductForm'
import CategoryForm from './category/CategoryForm'
import { ipcRendererHelper } from './utils/ipcRenderer'
import productSchema from './schemas/productSchema'

const initialProductData = Object.keys(productSchema).reduce((acc, key) => {
  acc[key] = ''
  return acc
}, {})

const ProductCategoryForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([])

  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [productData, setProductData] = useState(initialProductData)

  const resetForm = () => {
    setProductData(initialProductData)
    setSelectedCategoryId('')
  }

  useEffect(() => {
    ipcRendererHelper.send('get-categories')
    ipcRendererHelper.on('categories-data', (event, categoriesData) => {
      setCategories(categoriesData)
    })

    ipcRendererHelper.on('category-add-success', (event, newCategory) => {
      setCategories((prevCategories) => [...prevCategories, newCategory])
      setSelectedCategoryId(newCategory._id)
      setNewCategoryName('')
    })

    ipcRendererHelper.on('product-add-success', (event, newProduct) => {
      setProductData({})
      setSelectedCategoryId('')
    })

    // Remove all listeners when the component unmounts
    return () => {
      ipcRendererHelper.removeAllListeners('categories-data')
      ipcRendererHelper.removeAllListeners('category-add-success')
      ipcRendererHelper.removeAllListeners('product-add-success')
      ipcRendererHelper.removeAllListeners('category-add-error')
      ipcRendererHelper.removeAllListeners('product-add-error')
    }
  }, [])

  const handleProductDataChange = (updatedProductData) => {
    setProductData(updatedProductData)
  }
  const handleCategoryChange = (name) => {
    setNewCategoryName(name)
  }

  const handleCategorySubmit = useCallback(() => {
    return new Promise((resolve, reject) => {
      ipcRendererHelper.send('add-category', { name: newCategoryName })
      ipcRendererHelper.once('category-add-success', (event, newCategory) =>
        resolve(newCategory),
      )
      ipcRendererHelper.once('category-add-error', (event, error) =>
        reject(error),
      )
    })
  }, [newCategoryName])

  const handleSubmit = async () => {
    if (newCategoryName) {
      try {
        const newCategory = await handleCategorySubmit()
        handleProductSubmit(newCategory._id)
      } catch (error) {
        console.error('Error adding category:', error)
        return
      }
    } else if (selectedCategoryId) {
      handleProductSubmit(selectedCategoryId)
    }
  }

  const handleProductSubmit = (categoryId) => {
    if (Object.keys(productData).length) {
      ipcRendererHelper.send('add-product', { ...productData, categoryId })
      resetForm()
    }
  }

  return (
    <div>
      <h1>Gestion des Produits et Catégories</h1>
      <CategoryForm
        categoryName={newCategoryName}
        onCategoryChange={handleCategoryChange}
      />
      <ProductForm
        productData={productData}
        onProductDataChange={handleProductDataChange}
      />
      <button onClick={handleSubmit}>Soumettre</button>
    </div>
  )
}

export default ProductCategoryForm
