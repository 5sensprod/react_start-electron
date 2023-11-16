import React, { useState } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ProductForm = ({ onProductAdded }) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    ipcRendererHelper
      .invoke('add-product', productName, productPrice)
      .then(() => {
        onProductAdded() // Cette fonction peut être utilisée pour recharger ou mettre à jour la liste des produits.
        setProductName('') // Réinitialiser le nom du produit
        setProductPrice('') // Réinitialiser le prix du produit
      })
      .catch((error) => {
        console.error('Failed to add product:', error)
        // Vous pouvez également gérer l'erreur ici, par exemple en informant l'utilisateur.
      })
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
          />
        </label>
        <br />
        <label>
          Prix du produit :
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default ProductForm
