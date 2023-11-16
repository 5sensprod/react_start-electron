import React, { useState } from 'react'
import ProductForm from './components/product/ProductForm'
import ProductList from './components/product/ProductList'

const App = () => {
  const [reloadProducts, setReloadProducts] = useState(false)

  const handleProductAdded = () => {
    setReloadProducts((prev) => !prev)
  }

  return (
    <div>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList key={reloadProducts} />
    </div>
  )
}

export default App
