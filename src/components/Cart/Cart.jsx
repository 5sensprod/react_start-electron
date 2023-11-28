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
import { addInvoice } from '../../api/invoiceService'
import InvoicePrintComponent from '../InvoicePrintComponent'
import usePrintInvoice from '../../hooks/usePrintInvoice'

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    onHoldInvoices,
    updateQuantity,
    updatePrice,
    removeItem,
    holdInvoice,
    resumeInvoice,
    deleteInvoice,
  } = useContext(CartContext)

  const { printRef, handlePrint } = usePrintInvoice()

  const [paymentType, setPaymentType] = useState('CB')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  const taxRate = 0.2
  const isCurrentCartOnHold = onHoldInvoices.some(
    (invoice) => JSON.stringify(invoice.items) === JSON.stringify(cartItems),
  )

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  }

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => {
      const itemPrice =
        item.prixModifie !== undefined ? item.prixModifie : item.prixVente
      const totalItemPrice = (itemPrice * item.quantity).toFixed(2)
      return (parseFloat(acc) + parseFloat(totalItemPrice)).toFixed(2)
    }, 0)
  }

  const calculateInvoiceTotal = (invoiceItems) => {
    return invoiceItems.reduce((total, item) => {
      // Utilise le prix modifié s'il existe, sinon utilise le prix original
      const priceToUse = item.prixModifie ?? item.prixVente
      return total + item.quantity * priceToUse
    }, 0)
  }

  const handlePayClick = async () => {
    // Transformez chaque article du panier pour inclure les informations nécessaires
    const invoiceItems = cartItems.map((item) => {
      const prixOriginalTTC = parseFloat(item.prixVente)
      const prixModifieTTC = item.prixModifie
        ? parseFloat(item.prixModifie)
        : prixOriginalTTC

      // Convertir les prix TTC en prix HT
      const prixHT = prixModifieTTC / (1 + taxRate)
      const montantTVA = prixHT * taxRate

      // Déterminer la remise ou la majoration
      let remiseMajorationLabel = ''
      let remiseMajorationValue = 0
      if (item.prixModifie) {
        const differenceTTC = prixModifieTTC - prixOriginalTTC
        remiseMajorationValue = Math.abs(
          (differenceTTC / prixOriginalTTC) * 100,
        )
        remiseMajorationLabel = differenceTTC < 0 ? 'Remise' : 'Majoration'
      }

      return {
        reference: item.reference,
        quantite: item.quantity,
        puHT: prixHT.toFixed(2),
        puTTC: prixModifieTTC.toFixed(2), // Utiliser le P.U TTC modifié
        tauxTVA: (taxRate * 100).toFixed(2),
        montantTVA: montantTVA.toFixed(2),
        remiseMajorationLabel,
        remiseMajorationValue: remiseMajorationValue.toFixed(2),
      }
    })

    // Calculez le total TTC de la facture à partir des prix TTC modifiés
    const totalTTC = invoiceItems
      .reduce((total, item) => {
        return total + item.quantite * parseFloat(item.puTTC)
      }, 0)
      .toFixed(2)

    // Créez l'objet de facture à envoyer
    const invoiceData = {
      items: invoiceItems,
      totalTTC, // Utiliser le total TTC calculé ci-dessus
      date: new Date().toISOString(),
      paymentType, // Type de paiement
      // ...autres informations que vous souhaitez inclure
    }

    try {
      const newInvoice = await addInvoice(invoiceData)
      console.log('New invoice added:', newInvoice)
      setInvoiceData(newInvoice) // Stockez les données retournées par l'API (y compris le numéro de facture)
      setCartItems([]) // Vide le panier après le paiement
      setIsModalOpen(true) // Ouvre la modal pour afficher la facture
    } catch (error) {
      console.error('An error occurred while adding the invoice:', error)
    }
  }

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
