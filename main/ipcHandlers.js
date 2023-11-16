// ipcHandlers.js
const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/databaseOperations')

function setupIpcHandlers(mainWindow) {
  ipcMain.handle('add-product', (event, productName, productPrice) => {
    addProduct(productName, productPrice, (err, newDoc) => {
      if (err) {
        // Vous devrez gérer l'erreur ici et éventuellement retourner ou envoyer une erreur au processus de rendu
        return
      }
      // Vous pouvez choisir d'envoyer une confirmation au processus de rendu ici si nécessaire
    })
  })

  ipcMain.handle('get-products', (event) => {
    getProducts((err, docs) => {
      if (err) {
        // Envoyer une erreur au processus de rendu
        mainWindow.webContents.send(
          'products-data-error',
          'Erreur lors de la récupération des produits',
        )
        return
      }
      mainWindow.webContents.send('products-data', docs)
    })
  })
}

module.exports = { setupIpcHandlers }
