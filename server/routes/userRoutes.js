// server/routes/userRoutes.js
const express = require('express')
const router = express.Router()
const db = require('../../main/database/database')

// Route pour obtenir les informations de l'entreprise
router.get('/company-info', (req, res) => {
  db.users.findOne({ role: 'company' }, (err, doc) => {
    // Assurez-vous que vos documents d'entreprise ont un champ 'role' avec la valeur 'company'
    if (err) {
      res
        .status(500)
        .send(
          "Erreur lors de la récupération des informations de l'entreprise.",
        )
    } else {
      res.send(doc)
    }
  })
})

module.exports = router
