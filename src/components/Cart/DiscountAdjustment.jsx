import React, { useState, useContext } from 'react'
import { TextField } from '@mui/material'
import { CartContext } from '../../contexts/CartContext'

const DiscountAdjustment = () => {
  const [adjustment, setAdjustment] = useState('')
  const { updateTotalWithAdjustment } = useContext(CartContext)

  const handleAdjustmentChange = (event) => {
    const newAdjustment = event.target.value
    setAdjustment(newAdjustment)
    updateTotalWithAdjustment(newAdjustment) // Une fonction à créer dans CartContext pour gérer la mise à jour
  }

  return (
    <TextField
      label="Remise/Majoration"
      value={adjustment}
      onChange={handleAdjustmentChange}
      // autres props si nécessaire
    />
  )
}

export default DiscountAdjustment
