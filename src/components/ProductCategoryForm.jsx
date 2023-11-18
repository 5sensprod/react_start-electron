import React from 'react'
import useProductCategory from './hooks/useProductCategory'
import CategoryForm from './category/CategoryForm'
import ProductForm from './product/ProductForm'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const ProductCategoryForm = () => {
  const {
    productData,
    newCategoryName,
    selectedCategoryId,
    setProductData,
    setNewCategoryName,
    handleCategorySubmit,
    handleProductSubmit,
  } = useProductCategory()

  // Function to handle form submission
  const handleSubmit = async () => {
    if (newCategoryName) {
      try {
        const newCategory = await handleCategorySubmit()
        handleProductSubmit(newCategory._id)
      } catch (error) {
        console.error('Error adding category:', error)
      }
    } else if (selectedCategoryId) {
      handleProductSubmit(selectedCategoryId)
    }
  }

  return (
    <>
      <Typography variant="h4" component="h4" gutterBottom>
        Gestion des Produits et Catégories
      </Typography>
      <Box my={3}>
        <CategoryForm
          categoryName={newCategoryName}
          onCategoryChange={setNewCategoryName}
        />
      </Box>
      <Box my={3}>
        <ProductForm
          productData={productData}
          onProductDataChange={setProductData}
        />
      </Box>
      <Box my={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Soumettre
        </Button>
      </Box>
    </>
  )
}

export default ProductCategoryForm
