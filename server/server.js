const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const app = express()
const PORT = process.env.PORT || 5000

const electron = require('electron')
const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const cataloguePath = path.join(userDataPath, 'catalogue')

app.use('/catalogue', express.static(cataloguePath))

app.use(
  cors({
    origin: 'http://localhost:3000',
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
