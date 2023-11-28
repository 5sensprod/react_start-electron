// src/components/InvoicePrintComponent.js
import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import { CompanyInfoContext } from '../../contexts/CompanyInfoContext'

const InvoicePrintComponent = React.forwardRef(({ invoiceData }, ref) => {
  const companyInfo = useContext(CompanyInfoContext)
  // Formatage de la date pour l'affichage
  const formattedDate =
    invoiceData &&
    new Date(invoiceData.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div ref={ref}>
      {/* Entête de la facture */}
      {companyInfo && (
        <>
          <Typography variant="h5">{companyInfo.name}</Typography>
          <Typography variant="body1">{companyInfo.address}</Typography>
          <Typography variant="body1">{companyInfo.city}</Typography>
          <Typography variant="body1">Tél: {companyInfo.phone}</Typography>
          <Typography variant="body1">Email: {companyInfo.email}</Typography>
          <Typography variant="body1">TVA: {companyInfo.taxId}</Typography>
        </>
      )}
      <Typography variant="h6">
        <Typography variant="body1">
          Facture #{invoiceData.invoiceNumber}
        </Typography>
      </Typography>
      <Typography variant="body2">Date: {formattedDate}</Typography>
      <Typography variant="body2">
        Type de paiement: {invoiceData.paymentType}
      </Typography>

      {/* Liste des articles */}
      <div>
        {invoiceData.items.map((item, index) => (
          <div key={index}>
            <Typography variant="body2">Référence: {item.reference}</Typography>
            <Typography variant="body2">Quantité: {item.quantite}</Typography>
            <Typography variant="body2">
              Prix unitaire HT: {item.puHT} €
            </Typography>
            <Typography variant="body2">
              Prix unitaire TTC: {item.puTTC} €
            </Typography>
            <Typography variant="body2">
              Montant total: {item.totalItem} €
            </Typography>
            <Typography variant="body2">Taux TVA: {item.tauxTVA} %</Typography>
            <Typography variant="body2">
              Montant TVA: {item.montantTVA} €
            </Typography>
            {item.remiseMajorationLabel && (
              <Typography variant="body2">
                {item.remiseMajorationLabel}: {item.remiseMajorationValue}
              </Typography>
            )}
          </div>
        ))}
      </div>

      {/* Total de la facture */}
      <Typography variant="body2">
        Total TTC: {invoiceData.totalTTC} €
      </Typography>

      {/* Pied de page */}
      <Typography variant="caption">Merci pour votre achat.</Typography>
    </div>
  )
})

export default InvoicePrintComponent
