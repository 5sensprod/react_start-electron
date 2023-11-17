// ipcHandlers.js
const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/productDbOperations.js')

function setupIpcHandlers(mainWindow) {
  ipcMain.on('add-product', (event, productData) => {
    addProduct(productData, (err, newDoc) => {
      if (err) {
        event.reply('product-add-error', err.message)
      } else {
        event.reply('product-add-success', newDoc) // Informer le rendu de la réussite
        // Optionnel : Envoyer une mise à jour de la liste des produits
        getProducts((err, docs) => {
          if (!err) {
            event.reply('products-data', docs)
          }
        })
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
