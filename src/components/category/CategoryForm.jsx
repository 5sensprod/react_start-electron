import React, { useState } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    ipcRendererHelper.send('add-category', { name: categoryName })
    setCategoryName('') // Réinitialiser le formulaire après l'envoi
  }

  return (
    <div>
      <h1>Ajouter une Catégorie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la catégorie :
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default CategoryForm
