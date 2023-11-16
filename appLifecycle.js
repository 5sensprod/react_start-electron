const { app } = require('electron')
const { createWindow, getMainWindow } = require('./windowManager')

function setupAppLifecycle() {
  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // Utilisez ici getMainWindow au lieu de mainWindow
    if (getMainWindow() === null) {
      createWindow()
    }
  })
}

module.exports = { setupAppLifecycle }
