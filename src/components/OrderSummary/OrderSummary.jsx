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
  // Utilisez une fonction pour déterminer quel prix utiliser et calculer la remise/majoration
  const getPriceDetails = (item) => {
    const priceToUse = item.prixModifie ?? item.prixVente
    let label = ''
    let value = 0

    if (item.prixModifie) {
      const difference = item.prixModifie - item.prixVente
      value = Math.abs((difference / item.prixVente) * 100)
      if (difference < 0) {
        label = 'Remise'
      } else if (difference > 0) {
        label = 'Majoration'
      }
    }

    return {
      priceToUse,
      label,
      value: value.toFixed(2), // Format to 2 decimal places
    }
  }
  // Calculer le total TTC et HT en utilisant getPriceDetails
  const totalTTC = cartItems.reduce(
    (total, item) => total + item.quantity * getPriceDetails(item).priceToUse,
    0,
  )
  const totalHT = cartItems.reduce(
    (total, item) =>
      total +
      item.quantity * (getPriceDetails(item).priceToUse / (1 + taxRate)),
    0,
  )

  const formatPrice = (price) =>
    price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  const totalTaxes = totalTTC - totalHT

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h6">Ticket</Typography>
        <Divider />
        <List>
          {cartItems.map((item) => {
            const { label, value } = getPriceDetails(item)
            return (
              <ListItem key={item._id}>
                <ListItemText
                  primary={item.reference}
                  secondary={
                    <>
                      Quantité {item.quantity}
                      Prix unitaire {formatPrice(item.prixVente)}
                      {label && <span>{` ${label} ${value}%`}</span>}
                    </>
                  }
                />
              </ListItem>
            )
          })}
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
