// src/components/product/ProductList/ProductList.js
// src/components/product/ProductList/ProductList.js
import React from 'react'
import ProductItem from './ProductItem'
import useProducts from '../../hooks/useProducts'
import useSearch from '../../hooks/useSearch'

const ProductList = ({ searchTerm, addToCart }) => {
  const { products, loading, error } = useProducts()
  const filteredProducts = useSearch(products, searchTerm) // Résultat de useSearch

  if (loading) return <div>Loading...</div> // Utilisez le LoadingIndicator ici
  if (error) return <div>Error: {error.message}</div> // Utilisez AlertMessage pour les erreurs

  return (
    <div>
      {filteredProducts.map(
        (
          product, // Utilisez filteredProducts ici
        ) => (
          <ProductItem
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ),
      )}
    </div>
  )
}

export default ProductList
