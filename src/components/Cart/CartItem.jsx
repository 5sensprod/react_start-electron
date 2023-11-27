import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ReplayIcon from '@mui/icons-material/Replay'

const CartItem = ({ item, updateQuantity, updatePrice, removeItem }) => {
  const [editPrice, setEditPrice] = useState(
    item.prixVente.toLocaleString('fr-FR'),
  )

  const [isPriceEdited, setIsPriceEdited] = useState(false)

  const [originalPrice] = useState(item.prixVente)

  // Gérer le changement de prix
  const handlePriceChange = (event) => {
    // Autoriser les chiffres, la virgule et le point
    let value = event.target.value.replace(/[^0-9,.]/g, '')
    const firstCommaIndex = value.indexOf(',')
    if (firstCommaIndex !== -1) {
      value =
        value.slice(0, firstCommaIndex) +
        ',' +
        value.slice(firstCommaIndex + 1).replace(/,/g, '')
    }
    setEditPrice(value)
    setIsPriceEdited(true)
  }

  // Confirmer le nouveau prix
  const confirmPriceChange = () => {
    // Convertir la saisie en nombre flottant
    const newPrice = parseFloat(editPrice.replace(',', '.'))
    if (!isNaN(newPrice) && newPrice >= 0) {
      updatePrice(item._id, newPrice) // Mettre à jour le prix dans l'état global
      setEditPrice(
        newPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      ) // Formater pour l'affichage
    } else {
      // Si la conversion échoue, réinitialiser l'entrée avec la valeur originale formatée
      setEditPrice(
        originalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      )
    }
  }

  // Fonction pour réinitialiser le prix édité au prix original
  const resetPrice = () => {
    setEditPrice(
      originalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
    )
    setIsPriceEdited(false) // Cache l'affichage du prix original
    updatePrice(item._id, originalPrice) // Met à jour le prix dans l'état global
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10)
    if (newQuantity > 0) {
      updateQuantity(item._id, newQuantity)
    } else {
      removeItem(item._id)
    }
  }

  const handleRemoveClick = () => {
    removeItem(item._id)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{item.reference}</Typography>
        <TextField
          type="text"
          value={editPrice}
          onChange={handlePriceChange}
          onBlur={confirmPriceChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              confirmPriceChange()
              e.preventDefault()
              e.target.select()
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
        {isPriceEdited &&
          originalPrice !== parseFloat(editPrice.replace(',', '.')) && (
            <Box>
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Prix original:{' '}
                {originalPrice.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
                <IconButton
                  onClick={resetPrice}
                  edge="end"
                  size="small"
                  sx={{ margin: 1 }}
                >
                  <ReplayIcon /> {/* Icône de réinitialisation */}
                </IconButton>
              </Typography>
            </Box>
          )}
        <Box sx={{ marginTop: '10px' }}>
          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 0 }}
            size="small"
          />
          <IconButton onClick={handleRemoveClick}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CartItem
