const { app } = require('electron')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')

let mainWindow

function startExpressServer() {
  const server = require('../server/server') // Importez le serveur HTTP
  const PORT = 5000
  server.listen(PORT, () => {
    console.log(`Express and WebSocket server listening on port ${PORT}`)
  })
}

app.on('ready', () => {
  startExpressServer() // Démarrez le serveur Express lorsque Electron est prêt
  mainWindow = createWindow()
  setupIpcHandlers(mainWindow)
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
