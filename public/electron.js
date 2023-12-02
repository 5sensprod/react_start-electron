const { app } = require('electron')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')
const fs = require('fs')
const path = require('path')
const { setConfig } = require('../main/configManager')

const logFilePath = path.join(app.getPath('userData'), 'log.txt')

function logToFile(message) {
  const logMessage = new Date().toISOString() + ' - ' + message + '\n'
  fs.appendFileSync(logFilePath, logMessage)
}

logToFile('Application démarrée')

let config

const configPath = path.join(app.getPath('userData'), 'config.json')

try {
  if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath)
    config = JSON.parse(configFile)
  } else {
    const defaultConfigPath = path.join(__dirname, 'src/config.json')
    const defaultConfigFile = fs.readFileSync(defaultConfigPath)
    config = JSON.parse(defaultConfigFile)
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
  }
  console.log('Configuration actuelle:', config) // Ajouter cette ligne
} catch (error) {
  console.error('Erreur lors de la lecture du fichier de configuration:', error)
  config = { serverUrl: 'http://localhost:5000' }
}
let mainWindow

function startExpressServer() {
  try {
    const serverUrl = new URL(config.serverUrl)
    const PORT = serverUrl.port || 5000
    const HOST = serverUrl.hostname // Utiliser l'adresse IP ou le nom d'hôte de l'URL

    const server = require('../server/server')
    server.listen(PORT, HOST, () => {
      console.log(`Express and WebSocket server listening on ${HOST}:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start the Express server:', error)
  }
}

setConfig(config)

app.on('ready', () => {
  console.log('App is ready, starting Express server...')
  startExpressServer()
  mainWindow = createWindow()
  setupIpcHandlers(mainWindow)
  console.log('Main window created')
})

app.on('window-all-closed', function () {
  console.log('All windows closed, quitting app')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  console.log('App activated')
  if (mainWindow === null) {
    console.log('Main window is null, creating new window')
    mainWindow = createWindow()
    setupIpcHandlers(mainWindow)
  } else {
    console.log('Main window already exists')
  }
})
