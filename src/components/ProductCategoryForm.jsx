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
      setSelectedCategoryId(newCategory._id)
    })

    ipcRendererHelper.on('product-add-success', (event, newProduct) => {
      console.log('Product added successfully:', newProduct)
      setProductData({})
      setSelectedCategoryId('')
    })
  }, [])

  const handleProductDataChange = useCallback((newProductData) => {
    setProductData(newProductData)
  }, [])

  const handleCategoryChange = useCallback((name) => {
    setNewCategoryName(name)
  }, [])

  const handleCategorySubmit = useCallback(() => {
    return new Promise((resolve, reject) => {
      ipcRendererHelper.send('add-category', { name: newCategoryName })

      ipcRendererHelper.once('category-add-success', (event, newCategory) => {
        resolve(newCategory)
      })

      ipcRendererHelper.once('category-add-error', (event, error) => {
        reject(error)
      })
    })
  }, [newCategoryName])

  const handleProductSubmit = useCallback(
    (categoryId) => {
      ipcRendererHelper.send('add-product', {
        ...productData,
        categoryId,
      })
    },
    [productData],
  )

  const handleSubmit = useCallback(async () => {
    let categoryId = selectedCategoryId

    if (newCategoryName) {
      try {
        const newCategory = await handleCategorySubmit()
        categoryId = newCategory._id
        setCategories((prevCategories) => [...prevCategories, newCategory])
      } catch (error) {
        console.error('Error adding category:', error)
        return
      }
    }

    if (Object.keys(productData).length > 0 && categoryId) {
      handleProductSubmit(categoryId)
      setProductData({})
    } else {
      console.log('No category ID or incomplete product data.')
    }
  }, [newCategoryName, selectedCategoryId, productData, handleCategorySubmit])

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
