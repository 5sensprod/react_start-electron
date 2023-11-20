const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000
const { getProducts } = require('../main/database/productDbOperations.js')

// Configurez CORS pour autoriser les requêtes de votre domaine client
app.use(
  cors({
    origin: 'http://localhost:3000', // Autoriser le domaine client à faire des requêtes
  }),
)

// Route de test pour vérifier que le serveur fonctionne
app.get('/test', (req, res) => {
  res.send('Test response from Express')
})

// Route pour obtenir les produits
app.get('/get-products', (req, res) => {
  getProducts((err, products) => {
    if (err) {
      console.error('Error fetching products:', err)
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits',
      })
    } else {
      res.json({ success: true, products })
    }
  })
})

function startServer() {
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}`),
  )
}

module.exports = startServer

// marche en dev
// app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

// module.exports = app
