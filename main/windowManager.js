const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow = null

function createWindow() {
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets/icon.ico'),
    webPreferences: {
      //   nodeIntegration: true,  Remarque: ceci est non sécurisé et déprécié
      contextIsolation: true, // Devrait être vrai pour la sécurité
      //  enableRemoteModule: true,  Devrait être évité si possible
      // Il est recommandé d'utiliser preload scripts et contextBridge pour la sécurité
    },
  })

  // Charger l'URL de développement ou de production
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(startURL)

  // Émis lorsque la fenêtre est fermée.
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  return mainWindow
}

module.exports = { createWindow }
