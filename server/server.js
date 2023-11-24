const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const electron = require('electron')

const WebSocket = require('ws')
const http = require('http')

const app = express()
const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const cataloguePath = path.join(userDataPath, 'catalogue')

app.use('/catalogue', express.static(cataloguePath))
// app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.static(path.join(__dirname, '..', 'build')))

app.use(
  cors({
    origin: [
      'http://192.168.1.10:5000',
      'http://192.168.1',
      'http://localhost:3000',
      'http://localhost:5000',
    ],
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

const server = http.createServer(app)

let isWebSocketServerReady = false
const wss = new WebSocket.Server({ server })

wss.on('listening', () => {
  console.log('WebSocket Server is listening, ready to accept connections')
  isWebSocketServerReady = true
})

wss.on('connection', function connection(ws) {
  console.log('Client connected')

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    // Retransmettre le message à tous les clients connectés
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', function close() {
    console.log('Client disconnected')
    // Vérifiez si tous les clients sont déconnectés et mettez à jour le statut en conséquence
    const allClientsDisconnected = [...wss.clients].every(
      (client) => client.readyState === WebSocket.CLOSED,
    )
    if (allClientsDisconnected) {
      isWebSocketServerReady = false
    }
  })
})

// Notez que si le serveur WebSocket devait être fermé correctement, vous devriez également gérer cet événement.
wss.on('close', () => {
  console.log('WebSocket Server has closed')
  isWebSocketServerReady = false
})

app.get('/status', (req, res) => {
  if (isWebSocketServerReady) {
    res.json({ status: 'ok' })
  } else {
    res.status(503).json({ status: 'not ready' })
  }
})

module.exports = server
