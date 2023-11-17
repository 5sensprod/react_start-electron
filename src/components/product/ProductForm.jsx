import React from 'react'
import { useTranslation } from 'react-i18next'
import productSchema from '../schemas/productSchema'

const FormField = ({ fieldKey, fieldSchema, value, onChange }) => {
  const { t } = useTranslation()
  const inputType = fieldSchema.type === String ? 'text' : 'number'
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

const ProductForm = ({ productData, onProductDataChange }) => {
  return (
    <div>
      {Object.keys(productSchema).map((key) => {
        const value = productData[key] !== undefined ? productData[key] : ''
        return (
          <FormField
            key={key}
            fieldKey={key}
            fieldSchema={productSchema[key]}
            value={value}
            onChange={(fieldKey, fieldValue) =>
              onProductDataChange({ ...productData, [fieldKey]: fieldValue })
            }
          />
        )
      })}
    </div>
  )
}

export default ProductForm
