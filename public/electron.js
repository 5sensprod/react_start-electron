const { app } = require('electron')
const isDev = require('electron-is-dev')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')

let mainWindow

function startExpressServer() {
  const startServer = require('../server/server') // Importez la fonction startServer
  startServer() // Démarrez le serveur Express
}

app.on('ready', () => {
  mainWindow = createWindow()
  setupIpcHandlers(mainWindow)

  if (!isDev) {
    // En mode production, démarrer le serveur Express
    startExpressServer()
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    mainWindow = createWindow()
    setupIpcHandlers(mainWindow)
  }
})
