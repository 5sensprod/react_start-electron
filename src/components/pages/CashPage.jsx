import React, { useState } from 'react'
import SearchBar from '../product/SearchBar'
import ProductList from '../product/ProductList'
import Cart from '../Cart/Cart'
import OrderSummary from '../OrderSummary/OrderSummary'
import {
  Container,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material'
import usePendingInvoices from '../PendingInvoices/usePendingInvoices'
import PendingInvoices from '../PendingInvoices'

const CashPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isScannerMode, setIsScannerMode] = useState(false)
  const [cart, setCart] = useState([])
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [itemToBeRemoved, setItemToBeRemoved] = useState(null)
  const taxRate = 0.2

  const { invoices, addInvoice, updateInvoice, deleteInvoice, loading, error } =
    usePendingInvoices()

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Mettre de côté l'article à supprimer et ouvrir la boîte de dialogue de confirmation
      setItemToBeRemoved(productId)
      setOpenConfirmDialog(true)
    } else {
      // Mise à jour de la quantité pour l'article spécifique
      setCart((currentCart) => {
        return currentCart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item,
        )
      })
    }
  }

  const removeItem = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId),
    )
  }

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === productToAdd._id,
      )
      if (existingProductIndex > -1) {
        // Si le produit existe déjà, mettez à jour la quantité
        const updatedCart = [...prevCart]
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        }
        return updatedCart
      } else {
        // Sinon, ajoutez le nouveau produit avec la quantité initiale de 1
        return [...prevCart, { ...productToAdd, quantity: 1 }]
      }
    })
  }

  const handleRemoveItemConfirm = () => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== itemToBeRemoved),
    )
    setOpenConfirmDialog(false) // Fermer la boîte de dialogue après confirmation
  }

  const handlePutOnHold = async () => {
    if (cart.length === 0) {
      alert('Le panier est vide.')
      return
    }

    const totalHT = cart.reduce(
      (sum, item) => sum + item.quantity * item.prixVente,
      0,
    )
    const tva = totalHT * taxRate
    const totalTTC = totalHT + tva

    const invoiceItems = cart.map((item) => ({
      reference: item.reference,
      gencode: item.gencode,
      quantity: item.quantity,
      prixUnitaire: item.prixVente,
      prixTotal: item.prixVente * item.quantity,
    }))

    const newInvoice = {
      items: invoiceItems,
      totalHT,
      tva,
      totalTTC,
      date: new Date().toISOString(),
    }

    try {
      await addInvoice(newInvoice)
      setCart([]) // Vider le panier après l'avoir mis en attente
    } catch (error) {
      console.error('Erreur lors de la mise en attente de la facture :', error)
    }
  }

  return (
    <div>
      <Container maxWidth="xl" my={3}>
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isScannerMode={isScannerMode}
                setIsScannerMode={setIsScannerMode}
              />
              <ProductList searchTerm={searchTerm} addToCart={addToCart} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Cart
                cartItems={cart}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
              <OrderSummary cartItems={cart} taxRate={taxRate} />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePutOnHold}
              >
                Mettre en attente
              </Button>

              {loading && <p>Chargement des factures...</p>}
              {error && <p>Erreur : {error.message}</p>}
              <PendingInvoices
                invoices={invoices}
                onEditInvoice={updateInvoice}
                onDeleteInvoice={deleteInvoice}
              />
            </Grid>
            <Dialog
              open={openConfirmDialog}
              onClose={() => setOpenConfirmDialog(false)}
            >
              <DialogTitle>
                Êtes-vous sûr de vouloir supprimer cet article ?
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpenConfirmDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleRemoveItemConfirm} color="error">
                  Supprimer
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default CashPage
