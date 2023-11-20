const { app } = require('electron')
const isDev = require('electron-is-dev')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')

let mainWindow

function startExpressServer() {
  // Importez le serveur Express ou le fichier qui démarre le serveur
  require('../server/server')() // Assurez-vous que cela démarre le serveur Express
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
