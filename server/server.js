const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const electron = require('electron')
const WebSocket = require('ws')
const http = require('http')
const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const cataloguePath = path.join(userDataPath, 'catalogue')
const invoiceRoutes = require('./routes/invoices')
const { getConfig } = require('../main/configManager')
const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use('/api/users', userRoutes)
app.use('/api', invoiceRoutes)
app.use('/api/products', productRoutes)
app.use('/catalogue', express.static(cataloguePath))

app.use(express.static(path.join(__dirname, '..', 'build')))

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
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.on('close', function close() {
    console.log('Client disconnected')
    const allClientsDisconnected = [...wss.clients].every(
      (client) => client.readyState === WebSocket.CLOSED,
    )
    if (allClientsDisconnected) {
      isWebSocketServerReady = false
    }
  })
})

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

// Nouvelle route pour obtenir la configuration actuelle
app.get('/api/config', (req, res) => {
  const currentConfig = getConfig()
  res.json(currentConfig)
})

module.exports = server
