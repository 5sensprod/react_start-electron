// src/components/InvoicePrintComponent.js
import React, { useContext } from 'react'
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material'
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
    <Box ref={ref} sx={{ p: 2 }}>
      {/* Entête de la facture */}
      <Box display="flex" justifyContent="space-between">
        {/* Card Entreprise - Haut Droite */}
        <Box>{/* Laisser vide ou ajouter logo si nécessaire */}</Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5">{companyInfo.name}</Typography>
          <Typography variant="body1">{companyInfo.address}</Typography>
          <Typography variant="body1">{companyInfo.city}</Typography>
          <Typography variant="body1">Tél: {companyInfo.phone}</Typography>
          <Typography variant="body1">Email: {companyInfo.email}</Typography>
          <Typography variant="body1">TVA: {companyInfo.taxId}</Typography>
        </Paper>
      </Box>
      {/* Informations de Facturation - Sous la Card Entreprise */}
      <Box mt={2}>
        <Typography variant="h6">
          Facture #{invoiceData.invoiceNumber}
        </Typography>
        <Typography variant="body2">Date: {formattedDate}</Typography>
        <Typography variant="body2">
          Type de paiement: {invoiceData.paymentType}
        </Typography>
      </Box>

      {/* Liste des articles */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="facture articles">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              {/* Colonne pour le prix catalogue TTC si remise/majoration est appliquée */}
              {invoiceData.items.some((item) => item.remiseMajorationLabel) && (
                <TableCell align="right">Px cat. TTC</TableCell>
              )}
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Prix unitaire HT</TableCell>
              <TableCell align="right">TVA %</TableCell>
              <TableCell align="right">Prix unitaire TTC</TableCell>
              <TableCell align="right">TVA</TableCell>
              <TableCell align="right">Total TTC</TableCell>
              {invoiceData.items.some((item) => item.remiseMajorationLabel) && (
                <TableCell align="right">Remise/Majoration</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.reference}
                </TableCell>
                {/* Toujours afficher une cellule dans la colonne "Px cat. TTC", même si vide */}
                {invoiceData.items.some((i) => i.remiseMajorationLabel) && (
                  <TableCell align="right">
                    {item.remiseMajorationLabel ? item.prixOriginal + ' €' : ''}
                  </TableCell>
                )}
                <TableCell align="right">{item.quantite}</TableCell>
                <TableCell align="right">{item.puHT} €</TableCell>
                <TableCell align="right">{item.tauxTVA} %</TableCell>
                <TableCell align="right">{item.puTTC} €</TableCell>
                <TableCell align="right">{item.montantTVA} €</TableCell>
                <TableCell align="right">{item.totalItem} €</TableCell>
                {/* Afficher la colonne de remise/majoration si applicable pour cet article */}
                {item.remiseMajorationLabel && (
                  <TableCell align="right">
                    {item.remiseMajorationLabel}: {item.remiseMajorationValue}
                  </TableCell>
                )}
                {/* Si aucun, ajouter une cellule vide pour maintenir la structure du tableau */}
                {!item.remiseMajorationLabel && (
                  <TableCell align="right"></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total de la facture */}
      <Typography variant="body2">
        Total TTC: {invoiceData.totalTTC} €
      </Typography>

      {/* Pied de page */}
      <Typography variant="caption">Merci pour votre achat.</Typography>
    </Box>
  )
})

export default InvoicePrintComponent
