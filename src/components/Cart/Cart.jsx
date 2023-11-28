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
  Modal,
  Paper,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InvoicePrintComponent from '../InvoicePrintComponent'
import usePrintInvoice from '../../hooks/usePrintInvoice'
import {
  formatPrice,
  calculateTotal,
  calculateInvoiceTotal,
} from '../../utils/priceUtils'
import useHandlePayClick from '../../hooks/useHandlePayClick'

const Cart = () => {
  const {
    cartItems,
    onHoldInvoices,
    updateQuantity,
    updatePrice,
    removeItem,
    holdInvoice,
    resumeInvoice,
    deleteInvoice,
    taxRate,
  } = useContext(CartContext)

  const { printRef, handlePrint } = usePrintInvoice()

  const [paymentType, setPaymentType] = useState('CB')
  const { isModalOpen, setIsModalOpen } = useContext(CartContext)
  const [invoiceData, setInvoiceData] = useState(null)

  const handlePayClick = useHandlePayClick(setInvoiceData)
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
                    onClick={() => handlePayClick(paymentType)}
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
                    {formatPrice(invoiceTotal)} - Facture en attente #
                    {index + 1}
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
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            La facture a été enregistrée avec succès.
          </Typography>
          {invoiceData && (
            <InvoicePrintComponent ref={printRef} invoiceData={invoiceData} />
          )}
          <Button onClick={handlePrint} variant="contained">
            Imprimer la facture
          </Button>
        </Paper>
      </Modal>
    </>
  )
}

export default Cart
