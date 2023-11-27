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

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  }

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
        <Typography>Sous-total HT {formatPrice(totalHT)}</Typography>
        <Typography>
          TVA ({(taxRate * 100).toFixed(0)}%) : {formatPrice(totalTaxes)}
        </Typography>
        <Divider />
        <Typography variant="h6">Total TTC {formatPrice(totalTTC)}</Typography>
      </CardContent>
    </Card>
  )
}

export default OrderSummary
