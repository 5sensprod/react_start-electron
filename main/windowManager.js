const { BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow = null

function createWindow() {
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  // et charger l'index.html de l'application.
  mainWindow.loadURL('http://localhost:3000')

  // Émis lorsque la fenêtre est fermée.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  return mainWindow
}

module.exports = { createWindow }
