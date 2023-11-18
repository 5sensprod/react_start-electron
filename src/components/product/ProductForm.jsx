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
  error,
}) => {
  const { t } = useTranslation()
  const inputType = type === String ? 'text' : 'number'
  const label = t(`productForm.labels.${fieldKey}`)

  const handleChange = (e) => {
    // Cette ligne n'est pas nécessaire car tu ne peux pas modifier `error` directement de cette façon. Tu dois utiliser `setErrors` fourni par le composant parent.
    // if (error && error !== '') error = '';

    onChange(fieldKey, e.target.value) // Appelle la fonction `onChange` fournie par le composant parent avec la nouvelle valeur.
  }

  return (
    <TextField
      label={label}
      type={inputType}
      value={value}
      onChange={handleChange} // Utilise la fonction `handleChange`
      required={required}
      variant="outlined"
      margin="normal"
      fullWidth
      error={!!error}
      helperText={error || ''}
    />
  )
}

const ProductForm = ({
  productData,
  onProductDataChange,
  errors,
  setErrors,
}) => {
  const handleFieldChange = (fieldKey, fieldValue) => {
    onProductDataChange(fieldKey, fieldValue)
    if (errors[fieldKey]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: '' }))
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      {Object.keys(productSchema).map((key) => (
        <Grid item xs={12} key={key}>
          <FormField
            fieldKey={key}
            fieldSchema={productSchema[key]}
            value={productData[key] || ''}
            onChange={handleFieldChange}
            error={errors[key]}
            helperText={errors[key]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductForm
