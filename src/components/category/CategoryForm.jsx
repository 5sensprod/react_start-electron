import React from 'react'

const CategoryForm = ({ categoryName, onCategoryChange }) => {
  return (
    <div>
      <label>
        Nom de la catégorie :
        <input
          type="text"
          value={categoryName}
          onChange={(e) => onCategoryChange(e.target.value)}
          required
        />
      </label>
    </div>
  )
}

export default CategoryForm
