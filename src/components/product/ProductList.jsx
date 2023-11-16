import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ProductList = () => {
  const [products, setProducts] = useState([])

  const handlePrint = () => {
    window.print()
  }

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
  }, [])

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
      <button onClick={handlePrint}>Imprimer la Liste</button>
    </div>
  )
}

export default ProductList
