import React, { useState, useCallback } from 'react'
import './i18n'
import ProductCategoryForm from './components/ProductCategoryForm'
import ProductList from './components/product/ProductList'

const App = () => {
  const [reloadProducts, setReloadProducts] = useState(false)

  const handleProductAdded = useCallback(() => {
    // Cette fonction pourrait être appelée pour recharger les produits après l'ajout d'un nouveau produit
    setReloadProducts((prev) => !prev)
  }, [])

  return (
    <div>
      {/* Remplacez ProductForm et CategoryForm par ProductCategoryForm */}
      <ProductCategoryForm onProductAdded={handleProductAdded} />
      <ProductList key={reloadProducts} />
    </div>
  )
}

export default App
