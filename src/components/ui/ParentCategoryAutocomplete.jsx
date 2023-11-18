import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const ParentCategoryAutocomplete = () => {
  const [categories, setCategories] = useState([])
  const [selectedParentCategory, setSelectedParentCategory] = useState(null)
  const [childCategories, setChildCategories] = useState([])

  useEffect(() => {
    ipcRendererHelper.send('get-parent-categories')

    const handleCategoriesData = (event, categoriesData) => {
      setCategories(categoriesData)
    }

    ipcRendererHelper.on('parent-categories-data', handleCategoriesData)

    return () => {
      ipcRendererHelper.removeAllListeners('parent-categories-data')
    }
  }, [])

  useEffect(() => {
    if (selectedParentCategory) {
      ipcRendererHelper.send('get-child-categories', selectedParentCategory._id)

      const handleChildCategoriesData = (event, childCategoriesData) => {
        setChildCategories(childCategoriesData)
      }

      ipcRendererHelper.on('child-categories-data', handleChildCategoriesData)

      return () => {
        ipcRendererHelper.removeAllListeners('child-categories-data')
      }
    }
  }, [selectedParentCategory])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Organise les enfants en colonne
        gap: 2, // Crée un espace entre les enfants
        // Ajoute d'autres styles comme nécessaire
      }}
    >
      <Autocomplete
        id="combo-box-parent-categories"
        options={categories}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setSelectedParentCategory(value)}
        renderInput={(params) => (
          <TextField {...params} label="Catégorie Parente" />
        )}
      />
      {selectedParentCategory && (
        <Autocomplete
          id="combo-box-child-categories"
          options={childCategories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Catégorie Enfant" />
          )}
          // Gestionnaire pour la sélection d'une option enfant, si nécessaire
          // onChange={(event, value) => { /* Ta logique ici */ }}
        />
      )}
    </Box>
  )
}

export default ParentCategoryAutocomplete
