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
      acc[key] = productSchema[key].type === String ? '' : 0
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
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(productSchema).forEach((key) => {
      const value = productData[key]
      const schema = productSchema[key]

      if (schema.required && (value === null || value === '' || value === 0)) {
        newErrors[key] = 'Ce champ est requis'
        isValid = false
      }

      if (
        schema.type === Number &&
        schema.min !== undefined &&
        value < schema.min
      ) {
        newErrors[key] =
          `La valeur doit être supérieure ou égale à ${schema.min}`
        isValid = false
      }

      // Ajouter ici d'autres règles de validation si nécessaire
    })

    setErrors(newErrors)
    return isValid
  }

  const handleParentCategoryChange = (category) => {
    const categoryId = category ? category._id : null
    setProductData({ ...productData, categoryId, subcategoryId: null })
  }

  const handleChildCategoryChange = (subcategory) => {
    const subcategoryId = subcategory ? subcategory._id : null
    setProductData({ ...productData, subcategoryId })
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      console.log('Validation échouée:', errors)
      return
    }

    ipcRendererHelper.send('add-product', productData)

    ipcRendererHelper.once('product-add-success', () => {
      setProductData(getInitialProductData()) // Réinitialiser le formulaire sur succès
      // Afficher un message de succès ou effectuer d'autres actions d'interface utilisateur
    })

    ipcRendererHelper.once('product-add-error', (event, error) => {
      console.error('Product add error:', error)
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
        onProductDataChange={(fieldKey, fieldValue) => {
          setProductData({ ...productData, [fieldKey]: fieldValue })
        }}
        errors={errors}
        setErrors={setErrors}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Ajouter le produit
      </Button>
    </Box>
  )
}

export default AddProductForm
