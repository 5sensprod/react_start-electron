import React, { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import CartItem from './CartItem'
import OrderSummary from '../OrderSummary/OrderSummary'
import {
  Box,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { formatPrice, calculateTotal } from '../../utils/priceUtils'
import useHandlePayClick from '../../hooks/useHandlePayClick'
import InvoiceModal from '../invoice/InvoiceModal'
import OnHoldInvoices from '../invoice/OnHoldInvoices'

const Cart = () => {
  const {
    cartItems,
    onHoldInvoices,
    updateQuantity,
    updatePrice,
    removeItem,
    holdInvoice,
    taxRate,
    setInvoiceData,
  } = useContext(CartContext)

  const [paymentType, setPaymentType] = useState('CB')

  const handlePayment = useHandlePayClick(paymentType, setInvoiceData)

  const isCurrentCartOnHold = onHoldInvoices.some(
    (invoice) => JSON.stringify(invoice.items) === JSON.stringify(cartItems),
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="payment-type-label">Type de paiement</InputLabel>
            <Select
              labelId="payment-type-label"
              id="payment-type-select"
              value={paymentType}
              label="Type de paiement"
              onChange={(event) => setPaymentType(event.target.value)}
            >
              <MenuItem value="CB">Carte Bancaire</MenuItem>
              <MenuItem value="Cash">Espèces</MenuItem>
              <MenuItem value="Cheque">Chèque</MenuItem>
              <MenuItem value="ChequeCadeau">Chèque Cadeau</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
                  Total:{' '}
                  {formatPrice(
                    calculateTotal(
                      cartItems,
                      (item) => item.prixModifie ?? item.prixVente,
                    ),
                  )}
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
                  <Button
                    onClick={() => handlePayment(paymentType)}
                    variant="contained"
                    color="primary"
                  >
                    Payer
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="h6">Votre panier est vide.</Typography>
            )}
          </Box>
        </Grid>
        {cartItems.length > 0 && (
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} taxRate={taxRate} />
          </Grid>
        )}
        <OnHoldInvoices />
      </Grid>
      <InvoiceModal />
    </>
  )
}

export default Cart
