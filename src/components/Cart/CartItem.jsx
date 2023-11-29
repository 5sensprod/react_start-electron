import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ReplayIcon from '@mui/icons-material/Replay'
import { formatPrice } from '../../utils/priceUtils'

const CartItem = ({ item, updatePrice, updateQuantity, removeItem }) => {
  const originalPrice = item.prixVente
  const [priceInput, setPriceInput] = useState(
    item.prixModifie
      ? formatPrice(item.prixModifie)
      : formatPrice(originalPrice),
  )

  const isPriceEdited =
    item.prixModifie !== undefined && item.prixModifie !== originalPrice

  const handlePriceChange = (event) => {
    setPriceInput(event.target.value)
  }

  const confirmPriceChange = () => {
    const newPrice = parseFloat(
      priceInput.replace(/[^0-9,.-]/g, '').replace(',', '.'),
    )
    if (!isNaN(newPrice) && newPrice >= 0) {
      updatePrice(item._id, newPrice)
      setPriceInput(formatPrice(newPrice))
    }
  }

  const resetPrice = () => {
    setPriceInput(formatPrice(originalPrice))
    updatePrice(item._id, originalPrice)
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
          value={priceInput}
          onChange={handlePriceChange}
          onBlur={confirmPriceChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              confirmPriceChange()
              e.target.blur()
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
        {isPriceEdited && (
          <Box>
            <Typography variant="body2" color="textSecondary">
              Prix catalogue : {formatPrice(originalPrice)}
              <IconButton onClick={resetPrice} size="small">
                <ReplayIcon />
              </IconButton>
            </Typography>
          </Box>
        )}
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
      </CardContent>
    </Card>
  )
}

export default CartItem
