import React from 'react'
import { useTranslation } from 'react-i18next'
import productSchema from '../schemas/productSchema'

const FormField = ({
  fieldKey,
  fieldSchema: { type, required },
  value,
  onChange,
}) => {
  const { t } = useTranslation()
  const inputType = type === String ? 'text' : 'number'
  const label = t(`productForm.labels.${fieldKey}`)

  return (
    <label>
      {label} :
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        required={required}
      />
    </label>
  )
}

const ProductForm = ({ productData, onProductDataChange }) => {
  return (
    <div>
      {Object.keys(productSchema).map((key) => (
        <FormField
          key={key}
          fieldKey={key}
          fieldSchema={productSchema[key]}
          value={productData[key] || ''}
          onChange={(fieldKey, fieldValue) =>
            onProductDataChange({ ...productData, [fieldKey]: fieldValue })
          }
        />
      ))}
    </div>
  )
}

export default ProductForm
