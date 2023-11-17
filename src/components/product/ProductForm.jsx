// src/components/product/ProductForm.jsx
import React, { useState, useEffect } from 'react'
import productSchema from '../schemas/productSchema'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const FormField = ({ fieldKey, fieldSchema, value, onChange }) => {
  // Déterminez le type d'input basé sur le schéma
  const inputType = fieldSchema.type === String ? 'text' : 'number'

  return (
    <label>
      {fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)} :
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        required={fieldSchema.required}
      />
    </label>
  )
}

const ProductForm = ({ onProductAdded }) => {
  // Initialisez productData en utilisant le schéma pour créer un objet avec toutes les clés nécessaires
  const initialProductData = Object.keys(productSchema).reduce((acc, key) => {
    acc[key] = ''
    return acc
  }, {})

  const [productData, setProductData] = useState(initialProductData)

  // Gestion des réponses IPC
  useEffect(() => {
    const handleProductAddSuccess = (event, newDoc) => {
      onProductAdded(newDoc)
      setProductData(initialProductData) // Réinitialisez le formulaire après un ajout réussi
    }

    const handleProductAddError = (event, error) => {
      console.error('Failed to add product:', error)
    }

    ipcRendererHelper.on('product-add-success', handleProductAddSuccess)
    ipcRendererHelper.on('product-add-error', handleProductAddError)

    // Nettoyage des listeners à la destruction du composant
    return () => {
      ipcRendererHelper.removeAllListeners('product-add-success')
      ipcRendererHelper.removeAllListeners('product-add-error')
    }
  }, [onProductAdded, initialProductData])

  const handleChange = (key, value) => {
    setProductData((prevData) => ({ ...prevData, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Convertissez les valeurs en types appropriés si nécessaire
    const formattedData = Object.keys(productData).reduce((acc, key) => {
      acc[key] =
        productSchema[key].type === Number
          ? parseFloat(productData[key])
          : productData[key]
      return acc
    }, {})
    ipcRendererHelper.send('add-product', formattedData)
  }

  return (
    <div>
      <h1>Ajouter un Produit</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(productSchema).map((key) => (
          <FormField
            key={key}
            fieldKey={key}
            fieldSchema={productSchema[key]}
            value={productData[key]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default ProductForm
