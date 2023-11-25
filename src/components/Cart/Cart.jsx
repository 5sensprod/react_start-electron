import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import CartItem from './CartItem'
import OrderSummary from '../OrderSummary/OrderSummary' // Assurez-vous que le chemin d'accès est correct
import { Box, Typography, Button, Grid } from '@mui/material'

const Cart = () => {
  const {
    cartItems,
    onHoldInvoices,
    updateQuantity,
    removeItem,
    checkout,
    holdInvoice,
    resumeInvoice,
  } = useContext(CartContext)

  // Définissez le taux de taxe ici ou obtenez-le de votre configuration / état global
  const taxRate = 0.2 // 20% par exemple

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
              <Typography variant="h5">
                Total: {/* Calculer le total ici */} €
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '8px',
                }}
              >
                <Button
                  onClick={holdInvoice}
                  variant="contained"
                  sx={{ marginRight: '8px' }}
                >
                  Mettre en attente
                </Button>
                <Button onClick={checkout} variant="contained" color="primary">
                  Payer
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6">Votre panier est vide.</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <OrderSummary cartItems={cartItems} taxRate={taxRate} />
      </Grid>
      {onHoldInvoices.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6">Factures en attente:</Typography>
          {onHoldInvoices.map((invoice, index) => (
            <Box key={index} sx={{ marginBottom: '8px' }}>
              <Typography>Facture en attente #{index + 1}</Typography>
              <Button onClick={() => resumeInvoice(index)} variant="contained">
                Reprendre
              </Button>
            </Box>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default Cart
