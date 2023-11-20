const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path') // Ajout de l'importation du module path
const productRoutes = require('./routes/productRoutes')
const app = express()
const PORT = process.env.PORT || 5000

app.use('/catalogue', express.static(path.join(__dirname, 'catalogue')))

app.use(
  cors({
    origin: 'http://localhost:3000', // ou l'origine que vous souhaitez autoriser
  }),
)
app.use(bodyParser.json())

app.use('/api/products', productRoutes)

app.get('/test', (req, res) => {
  res.send('Le serveur fonctionne correctement.')
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur express écoutant sur le port ${PORT}`)
  })
} else {
  module.exports = app
}
