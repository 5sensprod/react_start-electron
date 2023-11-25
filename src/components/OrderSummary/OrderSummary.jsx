// src/components/OrderSummary/OrderSummary.js
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
const OrderSummary = ({ cartItems, taxRate }) => {
  // Calculer le total TTC
  const totalTTC = cartItems.reduce(
    (total, item) => total + item.quantity * item.prixVente,
    0,
  )

  // Calculer le total HT
  const totalHT = cartItems.reduce((total, item) => {
    // Retirer la taxe de chaque prix de vente pour obtenir le prix HT
    const prixHT = item.prixVente / (1 + taxRate)
    return total + item.quantity * prixHT
  }, 0)

  // Calculer le montant total de la taxe
  const totalTaxes = totalTTC - totalHT

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h6">Ticket</Typography>
        <Divider />
        <List>
          {cartItems.map((item) => (
            <ListItem key={item._id}>
              <ListItemText
                primary={item.reference}
                secondary={`Quantité: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography>Sous-total HT: {totalHT.toFixed(2)} €</Typography>
        <Typography>
          Taxe ({(taxRate * 100).toFixed(0)}%) : {totalTaxes.toFixed(2)} €
        </Typography>
        <Divider />
        <Typography variant="h5">Total TTC: {totalTTC.toFixed(2)} €</Typography>
      </CardContent>
    </Card>
  )
}

export default OrderSummary
