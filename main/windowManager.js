const { BrowserWindow } = require('electron')

let mainWindow = null

function createWindow() {
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  // et charger l'index.html de l'application.
  mainWindow.loadURL('http://localhost:3000')

  // Émis lorsque la fenêtre est fermée.
  mainWindow.on('closed', function () {
    // Déréférence l'objet window, habituellement vous stockeriez les fenêtres
    // dans un tableau si votre application supporte des fenêtres multiples, c'est le moment
    // où vous devriez supprimer l'élément correspondant.
    mainWindow = null
  })

  return mainWindow
}

module.exports = { createWindow }
