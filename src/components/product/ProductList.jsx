import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    ipcRendererHelper
      .invoke('get-products')
      .then((docs) => {
        if (Array.isArray(docs)) {
          setProducts(docs)
        } else {
          console.error('Les données reçues ne sont pas un tableau', docs)
        }
      })
      .catch((error) => {
        console.error(error)
      })

    const handleProductsData = (event, docs) => {
      setProducts(docs)
    }

    ipcRendererHelper.on('products-data', handleProductsData)

    // Cleanup this component
    return () => {
      ipcRendererHelper.removeAllListeners('products-data')
    }
  }, []) // Empty array ensures this effect runs only once after the component mounts

  return (
    <div>
      <h2>Liste des Produits</h2>
      <ul>
        {products &&
          products.map((product, index) => (
            <li key={index}>
              {product.name} - {product.price} €
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductList
