import React from 'react'
import useProductCategory from './hooks/useProductCategory'
import CategoryForm from './category/CategoryForm'
import ProductForm from './product/ProductForm'

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
    <div>
      <h1>Gestion des Produits et Catégories</h1>
      <CategoryForm
        categoryName={newCategoryName}
        onCategoryChange={setNewCategoryName}
      />
      <ProductForm
        productData={productData}
        onProductDataChange={setProductData}
      />
      <button onClick={handleSubmit}>Soumettre</button>
    </div>
  )
}

export default ProductCategoryForm
