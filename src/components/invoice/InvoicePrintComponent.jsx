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
import { formatNumberFrench } from '../../utils/priceUtils'

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

  const items = invoiceData.items // Assurez-vous que cette ligne est correcte selon votre structure de données
  const hasAnyDiscountOrMarkup =
    items && items.some((item) => item.remiseMajorationLabel)

  const discountOrMarkupTitle = () => {
    const discountItems = items.filter(
      (item) => item.remiseMajorationLabel === 'Remise',
    ).length
    const markupItems = items.filter(
      (item) => item.remiseMajorationLabel === 'Majoration',
    ).length

    if (discountItems >= markupItems) {
      return 'Remise'
    } else {
      return 'Majoration'
    }
  }

  const generateTableHeaders = () => {
    return [
      <TableCell key="description">Référence</TableCell>,
      hasAnyDiscountOrMarkup && (
        <TableCell key="pxCatTTC" align="right">
          Px Cat. TTC
        </TableCell>
      ),
      <TableCell key="quantity" align="right">
        Qté
      </TableCell>,
      <TableCell key="puHT" align="right">
        P.U HT
      </TableCell>,
      <TableCell key="tvaPercentage" align="right">
        TVA
      </TableCell>,
      <TableCell key="puTTC" align="right">
        P.U TTC
      </TableCell>,
      hasAnyDiscountOrMarkup && (
        <TableCell key="discountOrMarkup" align="right">
          {discountOrMarkupTitle()}
        </TableCell>
      ),
      <TableCell key="totalTTC" align="right">
        Total TTC
      </TableCell>,
    ].filter(Boolean)
  }

  const generateTableRowCells = (item) => {
    return [
      <TableCell key={`desc-${item.reference}`}>{item.reference}</TableCell>,
      hasAnyDiscountOrMarkup && (
        <TableCell key={`pxCat-${item.reference}`} align="right">
          {item.remiseMajorationLabel
            ? `${formatNumberFrench(item.prixOriginal)} €`
            : ''}
        </TableCell>
      ),
      <TableCell key={`qty-${item.reference}`} align="right">
        {item.quantite}
      </TableCell>,
      <TableCell
        key={`puht-${item.reference}`}
        align="right"
      >{`${formatNumberFrench(item.puHT)} €`}</TableCell>,
      <TableCell key={`tva-${item.reference}`} align="right">{`${parseFloat(
        item.tauxTVA,
      ).toFixed(0)} %`}</TableCell>,
      <TableCell
        key={`puttc-${item.reference}`}
        align="right"
      >{`${formatNumberFrench(item.puTTC)} €`}</TableCell>,
      hasAnyDiscountOrMarkup && (
        <TableCell key={`discountOrMarkup-${item.reference}`} align="right">
          {item.remiseMajorationLabel
            ? `${formatNumberFrench(item.remiseMajorationValue)} %`
            : ''}
        </TableCell>
      ),
      <TableCell
        key={`total-${item.reference}`}
        align="right"
      >{`${formatNumberFrench(item.totalItem)} €`}</TableCell>,
    ].filter(Boolean)
  }

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
      <TableContainer component={Paper}>
        <Table aria-label="facture articles">
          <TableHead>
            <TableRow>{generateTableHeaders(invoiceData.items)}</TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item, index) => (
              <TableRow key={index}>{generateTableRowCells(item)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total de la facture */}
      <Typography variant="body2">Total HT: {invoiceData.totalHT} €</Typography>
      <Typography variant="body2">TVA: {invoiceData.totalTVA} €</Typography>
      <Typography variant="body2">
        Total TTC: {invoiceData.totalTTC} €
      </Typography>

      {/* Pied de page */}
      <Typography variant="caption">Merci pour votre achat.</Typography>
    </Box>
  )
})

export default InvoicePrintComponent
