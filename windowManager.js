const { BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  mainWindow.loadURL('http://localhost:3000')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function closeWindow() {
  if (mainWindow) {
    mainWindow.close()
  }
}

module.exports = {
  createWindow,
  closeWindow,
  getMainWindow: () => mainWindow, // Encapsulation pour éviter la modification directe
}
