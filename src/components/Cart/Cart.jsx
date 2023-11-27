import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import CartItem from './CartItem'
import OrderSummary from '../OrderSummary/OrderSummary' // Assurez-vous que le chemin d'accès est correct
import { Box, Typography, Button, Grid, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Cart = () => {
  const {
    cartItems,
    onHoldInvoices,
    updateQuantity,
    updatePrice,
    removeItem,
    checkout,
    holdInvoice,
    resumeInvoice,
    deleteInvoice,
  } = useContext(CartContext)

  const taxRate = 0.2 // 20% par exemple

  const isCurrentCartOnHold = onHoldInvoices.some(
    (invoice) => JSON.stringify(invoice.items) === JSON.stringify(cartItems),
  )

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  }

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.prixVente, 0)
  }

  const calculateInvoiceTotal = (invoiceItems) => {
    return invoiceItems.reduce(
      (acc, item) => acc + item.quantity * item.prixVente,
      0,
    )
  }

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
                  updatePrice={updatePrice}
                  removeItem={removeItem}
                />
              ))}
              <Typography variant="h5">
                Total: {formatPrice(calculateTotal(cartItems))}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '8px',
                }}
              >
                {!isCurrentCartOnHold && cartItems.length > 0 && (
                  <Button
                    onClick={holdInvoice}
                    variant="contained"
                    sx={{ marginRight: '8px' }}
                  >
                    Mettre en attente
                  </Button>
                )}
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
          {onHoldInvoices.map((invoice, index) => {
            // Calculez le total de la facture en attente actuelle
            const invoiceTotal = calculateInvoiceTotal(invoice.items)
            return (
              <Box
                key={index}
                sx={{
                  marginBottom: '8px',
                  flexDirection: 'column', // Définit la direction de la boîte sur la colonne
                }}
              >
                <Typography sx={{ marginBottom: '4px' }}>
                  {formatPrice(invoiceTotal)} - Facture en attente #{index + 1}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Button
                    onClick={() => resumeInvoice(index)}
                    variant="contained"
                    sx={{ marginRight: '8px' }}
                  >
                    Reprendre
                  </Button>
                  <IconButton
                    onClick={() => deleteInvoice(index)}
                    sx={{ marginLeft: '8px' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}

export default Cart
