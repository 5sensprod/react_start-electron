const express = require('express')
const router = express.Router()
const db = require('../../main/database/database')

// Obtenir toutes les factures en attente
router.get('/pending-invoices', (req, res) => {
  db.pendingInvoices.find({}, (err, invoices) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des factures.')
    } else {
      res.send(invoices)
    }
  })
})

// Ajouter une nouvelle facture en attente
router.post('/pending-invoices', (req, res) => {
  let newInvoice = req.body

  // Assigner un nouvel ID si l'ID n'est pas fourni
  if (!newInvoice.id) {
    newInvoice.id =
      Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  db.pendingInvoices.insert(newInvoice, (err, invoice) => {
    if (err) {
      console.error("Erreur lors de l'insertion de la facture :", err)
      res.status(500).send("Erreur lors de l'ajout de la facture.")
    } else {
      res.status(201).send(invoice)
    }
  })
})

// Mettre à jour une facture en attente
router.put('/pending-invoices/:id', (req, res) => {
  const { id } = req.params
  db.pendingInvoices.update(
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
router.delete('/pending-invoices/:id', (req, res) => {
  const { id } = req.params
  db.pendingInvoices.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression de la facture.')
    } else {
      res.status(200).send({ numRemoved })
    }
  })
})

module.exports = router
