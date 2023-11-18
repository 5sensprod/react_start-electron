import React from 'react'
import TextField from '@mui/material/TextField'

const CategoryForm = ({ categoryName, onCategoryChange }) => {
  return (
    // <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1 }, // Ajoute un espacement autour de chaque TextField
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    <TextField
      label="Nom de la catégorie"
      type="text"
      value={categoryName}
      onChange={(e) => onCategoryChange(e.target.value)}
      required
      fullWidth
      variant="outlined"
    />
    // </Box>
  )
}

export default CategoryForm
