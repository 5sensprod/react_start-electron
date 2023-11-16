const { app } = require('electron')
const { createWindow } = require('./main/windowManager')
const { setupIpcHandlers } = require('./main/ipcHandlers')

let mainWindow

app.on('ready', () => {
  mainWindow = createWindow()
  setupIpcHandlers(mainWindow) // Configure les gestionnaires IPC
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    mainWindow = createWindow()
    setupIpcHandlers(mainWindow) // S'assurer que les gestionnaires IPC sont configurés pour la nouvelle fenêtre
  }
})
