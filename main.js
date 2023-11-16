const { app, BrowserWindow, ipcMain } = require('electron')
const { addProduct, getProducts } = require('./databaseOperations') // Assurez-vous que le chemin est correct

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Ajoutez cette ligne si vous rencontrez des problèmes avec l'intégration de Node.js
      enableRemoteModule: true, // Si vous avez besoin d'utiliser remote
    },
  })

  mainWindow.loadURL('http://localhost:3000')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// Configurations IPC pour la communication avec le processus de rendu
ipcMain.handle('add-product', (event, productName, productPrice) => {
  addProduct(productName, productPrice, (err, newDoc) => {
    // Gérer la réponse, par exemple, envoyer une confirmation au processus de rendu
  })
})

ipcMain.handle('get-products', (event) => {
  getProducts((err, docs) => {
    mainWindow.webContents.send('products-data', docs)
  })
})
