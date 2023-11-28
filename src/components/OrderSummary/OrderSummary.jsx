import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { formatPrice } from '../../utils/priceUtils' // Importez seulement formatPrice

const OrderSummary = () => {
  // Utilisez useContext pour accéder aux données du CartContext
  const { cartItems, cartTotals, taxRate } = useContext(CartContext)

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h6">Résumé de la commande</Typography>
        <Divider />
        <List>
          {cartItems.map((item) => (
            <ListItem key={item._id}>
              <ListItemText
                primary={item.reference}
                secondary={
                  <>
                    Quantité: {item.quantity}
                    <br />
                    Prix unitaire:{' '}
                    {formatPrice(item.prixModifie ?? item.prixVente)}
                    {item.remiseMajorationLabel && (
                      <>
                        <br />
                        {item.remiseMajorationLabel}:{' '}
                        {item.remiseMajorationValue}%
                      </>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography>
          Sous-total HT: {formatPrice(cartTotals.totalHT)}
        </Typography>
        <Typography>
          TVA ({(taxRate * 100).toFixed(0)}%) :{' '}
          {formatPrice(cartTotals.totalTaxes)}
        </Typography>
        <Divider />
        <Typography variant="h6">
          Total TTC: {formatPrice(cartTotals.totalTTC)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default OrderSummary
