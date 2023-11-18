import React from 'react'
import { useTranslation } from 'react-i18next'
import productSchema from '../schemas/productSchema'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

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
    <TextField
      label={label}
      type={inputType}
      value={value}
      onChange={(e) => onChange(fieldKey, e.target.value)}
      required={required}
      variant="outlined"
      margin="normal"
      fullWidth
    />
  )
}

const ProductForm = ({ productData, onProductDataChange }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {Object.keys(productSchema).map((key) => (
        <Grid item xs={12} key={key}>
          {' '}
          {/* xs={12} assure que chaque champ prend la pleine largeur */}
          <FormField
            fieldKey={key}
            fieldSchema={productSchema[key]}
            value={productData[key] || ''}
            onChange={(fieldKey, fieldValue) =>
              onProductDataChange({ ...productData, [fieldKey]: fieldValue })
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductForm
