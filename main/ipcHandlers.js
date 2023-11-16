const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/databaseOperations')
const { mainWindow } = require('./windowManager')

function setupIPCHandlers() {
  ipcMain.handle('add-product', async (event, productName, productPrice) => {
    try {
      const newDoc = await addProduct(productName, productPrice)
      // Envoyer une confirmation au processus de rendu, si nécessaire
      event.reply('product-added', newDoc)
    } catch (err) {
      // Gérer l'erreur, par exemple, envoyer un message d'erreur au processus de rendu
      event.reply('product-add-error', err)
    }
  })

  ipcMain.handle('get-products', async (event) => {
    try {
      const docs = await getProducts()
      mainWindow.webContents.send('products-data', docs)
    } catch (err) {
      // Gérer l'erreur
      console.error('Failed to get products:', err)
    }
  })
}

module.exports = { setupIPCHandlers }
