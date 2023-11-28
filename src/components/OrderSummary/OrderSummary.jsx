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
import {
  formatPrice,
  calculateTotal,
  calculateDiscountMarkup,
} from '../../utils/priceUtils' // Importez la nouvelle fonction utilitaire

const OrderSummary = ({ cartItems, taxRate }) => {
  // Utilisez la fonction calculateTotal pour calculer le total HT et TTC
  const totalHT = calculateTotal(cartItems, (item) => {
    const priceToUse = item.prixModifie ?? item.prixVente
    return priceToUse / (1 + taxRate)
  })
  const totalTTC = calculateTotal(
    cartItems,
    (item) => item.prixModifie ?? item.prixVente,
  )
  const totalTaxes = totalTTC - totalHT

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h6">Résumé de la commande</Typography>
        <Divider />
        <List>
          {cartItems.map((item) => {
            const priceToUse = item.prixModifie ?? item.prixVente
            const { label, value } = calculateDiscountMarkup(
              item.prixVente,
              item.prixModifie,
            )

            return (
              <ListItem key={item._id}>
                <ListItemText
                  primary={item.reference}
                  secondary={
                    <>
                      Quantité: {item.quantity}
                      <br />
                      Prix unitaire: {formatPrice(priceToUse)}
                      {label && (
                        <>
                          <br />
                          {label}: {value}%
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <Typography>Sous-total HT: {formatPrice(totalHT)}</Typography>
        <Typography>
          TVA ({(taxRate * 100).toFixed(0)}%) : {formatPrice(totalTaxes)}
        </Typography>
        <Divider />
        <Typography variant="h6">Total TTC: {formatPrice(totalTTC)}</Typography>
      </CardContent>
    </Card>
  )
}

export default OrderSummary
