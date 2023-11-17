import React, { useState } from 'react'
import { useTranslation } from 'react-i18next' // Importez useTranslation
import productSchema from '../schemas/productSchema'

const FormField = ({ fieldKey, fieldSchema, value, onChange }) => {
  const { t } = useTranslation() // Utilisez le hook pour accéder à la fonction de traduction
  const inputType = fieldSchema.type === String ? 'text' : 'number'

  // Utilisez la fonction de traduction `t` pour obtenir le label traduit
  const label = t(`productForm.labels.${fieldKey}`)

  return (
    <label>
      {label} :
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        required={fieldSchema.required}
      />
    </label>
  )
}

const ProductForm = ({ onProductDataChange }) => {
  const initialProductData = Object.keys(productSchema).reduce((acc, key) => {
    acc[key] = ''
    return acc
  }, {})

  const [productData, setProductData] = useState(initialProductData)

  const handleChange = (key, value) => {
    const newData = { ...productData, [key]: value }
    setProductData(newData)
    onProductDataChange(newData) // Informer le composant parent de la modification
  }

  // Le formulaire n'a plus de gestionnaire d'envoi, car c'est le composant parent qui gère l'envoi.
  return (
    <div>
      {/* <h1>Ajouter un Produit</h1> */}
      {Object.keys(productSchema).map((key) => (
        <FormField
          key={key}
          fieldKey={key}
          fieldSchema={productSchema[key]}
          value={productData[key]}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}

export default ProductForm
