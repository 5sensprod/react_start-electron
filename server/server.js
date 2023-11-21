const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const electron = require('electron')

const app = express()
const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const cataloguePath = path.join(userDataPath, 'catalogue')

app.use('/catalogue', express.static(cataloguePath))
app.use(express.static(path.join(__dirname, '..', 'public')))

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

app.post('/scan', (req, res) => {
  const scannedData = req.body.data
  console.log('Données scannées reçues:', scannedData)
  res.status(200).json({ message: 'Données scannées reçues avec succès.' })
})

app.get('/scan', (req, res) => {
  res.send('Cette route attend une requête POST avec les données scannées.')
})

app.get('/testcamera', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'camera.html'))
})

module.exports = app // Export the Express app
