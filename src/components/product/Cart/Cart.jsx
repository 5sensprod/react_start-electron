// src/components/Cart/Cart.js
import React, { useState, useEffect } from 'react'
import CartItem from './CartItem'
import { Box, Typography, Button } from '@mui/material'

const Cart = ({ cartItems, updateQuantity, removeItem, checkout }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    )
    setTotal(newTotal)
  }, [cartItems])

  return (
    <Box>
      <Typography variant="h4">Panier</Typography>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
      <Typography variant="h5">Total: {total.toFixed(2)} €</Typography>
      <Button onClick={checkout} variant="contained" color="primary">
        Payer
      </Button>
    </Box>
  )
}

export default Cart
