const express = require('express')
const router = express.Router()
const db = require('../../main/database/database')

// Obtenir toutes les factures en attente
router.get('/invoices', (req, res) => {
  db.invoices.find({}, (err, invoices) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des factures.')
    } else {
      res.send(invoices)
    }
  })
})

// Ajouter une nouvelle facture en attente
// Fonction pour obtenir la date et l'heure actuelle sous forme de chaîne
const getDateTimeString = () => {
  const now = new Date()
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(
    2,
    '0',
  )}${String(now.getMinutes()).padStart(2, '0')}${String(
    now.getSeconds(),
  ).padStart(2, '0')}`
}

// Ajouter une nouvelle facture
router.post('/invoices', (req, res) => {
  // Obtenir la chaîne de date et d'heure actuelle
  const dateTimeString = getDateTimeString()

  // Générer le numéro de facture avec un numéro séquentiel
  // Cette partie pourrait être améliorée en cherchant dans la base de données pour le dernier numéro séquentiel utilisé aujourd'hui
  const invoiceNumber = `${dateTimeString}`

  let newInvoice = {
    ...req.body,
    invoiceNumber, // Ajoutez le numéro de facture généré ici
    date: new Date().toISOString(),
  }

  // Insérer la nouvelle facture dans la base de données
  db.invoices.insert(newInvoice, (err, invoice) => {
    if (err) {
      res.status(500).send("Erreur lors de l'ajout de la facture.")
    } else {
      res.status(201).send(invoice)
    }
  })
})

// Mettre à jour une facture en attente
router.put('/invoices/:id', (req, res) => {
  const { id } = req.params
  db.invoices.update(
    { _id: id },
    { $set: req.body },
    {},
    (err, numAffected) => {
      if (err) {
        res.status(500).send('Erreur lors de la mise à jour de la facture.')
      } else {
        res.status(200).send({ numAffected })
      }
    },
  )
})

// Supprimer une facture en attente
router.delete('/invoices/:id', (req, res) => {
  const { id } = req.params
  db.invoices.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression de la facture.')
    } else {
      res.status(200).send({ numRemoved })
    }
  })
})

module.exports = router
