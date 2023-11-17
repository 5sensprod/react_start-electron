import React, { useState } from 'react'

const CategoryForm = ({ onCategoryChange }) => {
  const [categoryName, setCategoryName] = useState('')

  const handleChange = (event) => {
    setCategoryName(event.target.value)
    // Préparez le composant pour qu'il informe le parent de la nouvelle valeur sans la soumettre
    onCategoryChange(event.target.value)
  }

  // Le bouton de soumission et le gestionnaire d'événements onSubmit ne sont plus nécessaires ici.
  // Le composant parent aura son propre bouton pour gérer la soumission de la catégorie.
  return (
    <div>
      {/* <h1>Ajouter une Catégorie</h1> */}
      <label>
        Nom de la catégorie :
        <input
          type="text"
          value={categoryName}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  )
}

export default CategoryForm
