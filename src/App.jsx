import React, { useState, useCallback } from 'react'
import './i18n'
import ProductForm from './components/product/ProductForm'
import ProductList from './components/product/ProductList'

const App = () => {
  const [reloadProducts, setReloadProducts] = useState(false)

  const handleProductAdded = useCallback(() => {
    setReloadProducts((prev) => !prev)
  }, []) // Aucune dépendance, donc cette fonction est mémorisée et ne change pas

  return (
    <div>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList key={reloadProducts} />
    </div>
  )
}

export default App
