import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ParentCategoryAutocomplete from './ui/ParentCategoryAutocomplete' // Assure-toi que le chemin est correct
import ProductForm from './product/ProductForm' // Assure-toi que le chemin est correct
import { ipcRendererHelper } from './utils/ipcRenderer' // Assure-toi que le chemin est correct
import productSchema from './schemas/productSchema'

const AddProductForm = () => {
  const [productData, setProductData] = useState(
    Object.keys(productSchema).reduce(
      (acc, key) => {
        acc[key] = productSchema[key].type === String ? '' : 0 // Utilise des chaînes vides pour les String et 0 pour les Number
        return acc
      },
      {
        categoryId: null, // Ajout de categoryId
        subcategoryId: null, // Ajout de subcategoryId
      },
    ),
  )

  // Cette fonction sera appelée lorsque la catégorie parente est sélectionnée
  const handleParentCategoryChange = (category) => {
    // Si aucune catégorie n'est sélectionnée, `category` sera `null`
    const categoryId = category ? category._id : null
    setProductData({
      ...productData,
      categoryId: categoryId,
      subcategoryId: null,
    })
  }

  // Cette fonction sera appelée lorsque la catégorie enfant est sélectionnée
  const handleChildCategoryChange = (subcategory) => {
    // Si aucune sous-catégorie n'est sélectionnée, `subcategory` sera `null`
    const subcategoryId = subcategory ? subcategory._id : null
    setProductData({ ...productData, subcategoryId: subcategoryId })
  }

  // Cette fonction gère la soumission du formulaire
  const handleSubmit = () => {
    // Tu dois vérifier que toutes les clés nécessaires sont présentes et validées avant l'envoi
    ipcRendererHelper.send('add-product', productData)
    // Ici, tu peux gérer la réponse ou la mise à jour de l'interface utilisateur après l'ajout
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
