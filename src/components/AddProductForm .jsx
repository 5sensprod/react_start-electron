import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ParentCategoryAutocomplete from './ui/ParentCategoryAutocomplete'
import ProductForm from './product/ProductForm'
import { ipcRendererHelper } from './utils/ipcRenderer'
import productSchema from './schemas/productSchema'

const getInitialProductData = () => {
  return Object.keys(productSchema).reduce(
    (acc, key) => {
      acc[key] = productSchema[key].type === String ? '' : 0 // Chaînes vides pour les String, 0 pour les Number
      return acc
    },
    {
      categoryId: null,
      subcategoryId: null,
    },
  )
}

const AddProductForm = () => {
  const [productData, setProductData] = useState(getInitialProductData())

  const handleParentCategoryChange = (category) => {
    const categoryId = category ? category._id : null
    setProductData({ ...productData, categoryId, subcategoryId: null })
  }

  const handleChildCategoryChange = (subcategory) => {
    const subcategoryId = subcategory ? subcategory._id : null
    setProductData({ ...productData, subcategoryId })
  }

  const handleSubmit = () => {
    ipcRendererHelper.send('add-product', productData)

    ipcRendererHelper.once('product-add-success', () => {
      setProductData(getInitialProductData()) // Réinitialise le formulaire sur succès
      // Ici, tu peux aussi afficher un message de succès ou effectuer d'autres actions d'interface utilisateur
    })

    ipcRendererHelper.once('product-add-error', (event, error) => {
      // Gère l'erreur d'ajout de produit
      console.error('Product add error:', error)
      // Ici, tu peux aussi afficher un message d'erreur ou effectuer d'autres actions d'interface utilisateur
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <ParentCategoryAutocomplete
        onParentCategoryChange={handleParentCategoryChange}
        onChildCategoryChange={handleChildCategoryChange}
      />
      <ProductForm
        productData={productData}
        onProductDataChange={setProductData}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Ajouter le produit
      </Button>
    </Box>
  )
}

export default AddProductForm
