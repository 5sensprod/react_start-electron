const { app } = require('electron')
const { createWindow, mainWindow } = require('./windowManager')

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
    if (mainWindow === null) {
      createWindow()
    }
  })
}

module.exports = { setupAppLifecycle }
