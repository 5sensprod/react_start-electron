const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets/icon.ico'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'), // Ajoutez le chemin vers votre fichier preload.js ici
    },
  })

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(startURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  return mainWindow
}

module.exports = { createWindow }
