import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ProductForm = ({ onProductAdded }) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')

  // Écoute la réponse du processus principal après avoir ajouté un produit
  useEffect(() => {
    const handleProductAddResponse = (event, response) => {
      if (response.error) {
        console.error('Failed to add product:', response.error)
      } else {
        onProductAdded() // Appelé lorsque le produit est ajouté avec succès
        setProductName('') // Réinitialiser le nom du produit
        setProductPrice('') // Réinitialiser le prix du produit
      }
    }

    ipcRendererHelper.on('product-add-response', handleProductAddResponse)

    // Nettoyage
    return () => {
      ipcRendererHelper.removeAllListeners('product-add-response')
    }
  }, [onProductAdded])

  const handleSubmit = (event) => {
    event.preventDefault()
    ipcRendererHelper.send('add-product', productName, productPrice)
  }

  return (
    <div>
      <h1>Ajouter un Produit</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom du produit :
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Prix du produit :
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default ProductForm
