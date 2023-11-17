// ipcHandlers.js
const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/databaseOperations')

function setupIpcHandlers(mainWindow) {
  ipcMain.handle('add-product', (event, productName, productPrice) => {
    addProduct(productName, productPrice, (err, newDoc) => {
      if (err) {
        // Gérer l'erreur ici et éventuellement retourner ou envoyer une erreur au processus de rendu
        return
      }
      // Choisir d'envoyer une confirmation au processus de rendu ici si nécessaire
    })
  })

  ipcMain.on('add-product', (event, productName, productPrice) => {
    addProduct(productName, productPrice, (err, newDoc) => {
      if (err) {
        event.reply('product-add-response', {
          error: "Erreur lors de l'ajout du produit",
        })
      } else {
        event.reply('product-add-response', { data: newDoc })
      }
    })
  })

  ipcMain.on('get-products', (event, args) => {
    getProducts((err, docs) => {
      if (err) {
        event.reply(
          'products-data-error',
          'Erreur lors de la récupération des produits',
        )
      } else {
        event.reply('products-data', docs)
      }
    })
  })
}

module.exports = { setupIpcHandlers }
