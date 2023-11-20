const { app } = require('electron')
const isDev = require('electron-is-dev')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')

let mainWindow
const PORT = 5000 // Assurez-vous que cette valeur de port est cohérente avec ce que votre serveur Express attend.

function startExpressServer() {
  const expressApp = require('../server/server') // Importez l'application Express
  expressApp.listen(PORT, () => {
    // Démarrez le serveur Express en écoutant sur le port spécifié
    console.log(`Express server listening on port ${PORT}`)
  })
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
