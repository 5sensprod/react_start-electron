// src/components/PendingInvoices/InvoicePreview.js
import React from 'react'
import { Card, CardContent, Typography, List, ListItem } from '@mui/material'

const InvoicePreview = ({ invoice }) => {
  return (
    <Card variant="outlined" style={{ margin: '0.5rem 0' }}>
      <CardContent>
        <Typography variant="h6">Facture en attente: {invoice._id}</Typography>
        <Typography color="textSecondary">
          Date: {new Date(invoice.date).toLocaleDateString()}
        </Typography>

        <List dense>
          {invoice.items.map((item, index) => (
            <ListItem key={index}>
              <Typography color="textSecondary">
                {item.quantity} x {item.reference} ({item.gencode}) - Prix
                unitaire {item.prixUnitaire.toFixed(2)} € Total:{' '}
                {item.prixTotal.toFixed(2)} €
              </Typography>
            </ListItem>
          ))}
        </List>

        <Typography color="textSecondary">
          Total HT: {invoice.totalHT.toFixed(2)} €
        </Typography>
        <Typography color="textSecondary">
          TVA: {invoice.tva.toFixed(2)} €
        </Typography>
        <Typography color="textSecondary">
          Total TTC: {invoice.totalTTC.toFixed(2)} €
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InvoicePreview
