import React from 'react'
import { List, Paper } from '@mui/material'
import InvoiceItem from './InvoiceItem'

const PendingInvoices = ({ invoices, onEditInvoice, onDeleteInvoice }) => {
  return (
    <Paper style={{ margin: '1em 0', padding: '1em' }}>
      <List dense>
        {invoices.map((invoice) => (
          // Assurez-vous que `invoice.id` est un identifiant unique pour chaque facture
          <InvoiceItem
            key={invoice._id} // Utilisez `_id` ou un champ unique de votre facture
            invoice={invoice}
            onEdit={onEditInvoice}
            onDelete={onDeleteInvoice}
          />
        ))}
      </List>
    </Paper>
  )
}

export default PendingInvoices
