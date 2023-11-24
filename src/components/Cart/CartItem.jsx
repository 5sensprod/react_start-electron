// src/components/Cart/CartItem.js
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const handleQuantityChange = (event) => {
    updateQuantity(item._id, parseInt(event.target.value, 10))
  }

  const handleRemoveClick = () => {
    removeItem(item._id)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{item.reference}</Typography>
        <Typography color="textSecondary">{item.prixVente} €</Typography>
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
