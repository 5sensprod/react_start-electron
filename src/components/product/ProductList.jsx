import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ProductList = () => {
  const [products, setProducts] = useState([])

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    ipcRendererHelper.send('get-products')

    // Gestionnaire pour écouter la réponse du processus principal
    const handleProductsData = (event, docs) => {
      if (Array.isArray(docs)) {
        setProducts(docs)
      } else {
        console.error('Les données reçues ne sont pas un tableau', docs)
      }
    }

    // Enregistrer le gestionnaire d'événements
    ipcRendererHelper.on('products-data', handleProductsData)

    // Nettoyage en retirant le gestionnaire d'événements
    return () => {
      ipcRendererHelper.removeAllListeners('products-data')
    }
  }, [])

  return (
    <div>
      <h2>Liste des Produits</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.surname} - {product.price} €
          </li>
        ))}
      </ul>
      <button onClick={handlePrint}>Imprimer la Liste</button>
    </div>
  )
}

export default ProductList
