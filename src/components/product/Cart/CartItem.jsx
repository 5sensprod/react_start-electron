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
    updateQuantity(item.id, parseInt(event.target.value, 10))
  }

  const handleRemoveClick = () => {
    removeItem(item.id)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="textSecondary">{item.price} €</Typography>
        <TextField
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
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
