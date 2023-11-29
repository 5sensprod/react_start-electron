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
import { formatPrice } from '../../utils/priceUtils'
import { formatNumberFrench } from '../../utils/priceUtils'

const OrderSummary = () => {
  const { cartItems, cartTotals } = useContext(CartContext)
  const tauxTVA = cartItems.length > 0 ? cartItems[0].tauxTVA : '0.00'
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
                secondary={
                  <>
                    Quantité: {item.quantity}
                    <br />
                    Prix unitaire HT: {formatPrice(parseFloat(item.prixHT))}
                    <br />
                    Prix unitaire TTC: {formatPrice(parseFloat(item.puTTC))}
                    {item.remiseMajorationLabel && (
                      <>
                        <br />
                        {item.remiseMajorationLabel}:{' '}
                        {formatNumberFrench(item.remiseMajorationValue)} %
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
          TVA ({tauxTVA}%) : {formatPrice(cartTotals.totalTaxes)}
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
