const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

app.use('/api/products', productRoutes)

app.get('/test', (req, res) => {
  res.send('Le serveur fonctionne correctement.')
})

app.listen(PORT, () =>
  console.log(`Serveur express écoutant sur le port ${PORT}`),
)

module.exports = app
