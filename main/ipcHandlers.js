// ipcHandlers.js
const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/productDbOperations.js')
const {
  addCategory,
  getCategories,
  getParentCategories,
  getChildCategories,
} = require('./database/categoryDbOperations.js')

function setupIpcHandlers(mainWindow) {
  ipcMain.on('add-product', (event, productData) => {
    addProduct(productData, (err, newDoc) => {
      if (err) {
        event.reply('product-add-error', err.message)
      } else {
        event.reply('product-add-success', newDoc)
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

  ipcMain.on('add-category', (event, categoryData) => {
    addCategory(categoryData, (err, newDoc) => {
      if (err) {
        event.reply('category-add-error', err.message)
      } else {
        event.reply('category-add-success', newDoc)
      }
    })
  })

  ipcMain.on('get-categories', (event, args) => {
    getCategories((err, docs) => {
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

  ipcMain.on('get-parent-categories', (event, args) => {
    getParentCategories((err, docs) => {
      if (err) {
        console.error('Error retrieving parent categories:', err)
        event.reply(
          'parent-categories-data-error',
          'Erreur lors de la récupération des catégories parentes',
        )
      } else {
        event.reply('parent-categories-data', docs)
      }
    })
  })

  ipcMain.on('get-child-categories', (event, parentId) => {
    getChildCategories(parentId, (err, docs) => {
      if (err) {
        event.reply(
          'child-categories-data-error',
          'Erreur lors de la récupération des catégories enfants',
        )
      } else {
        event.reply('child-categories-data', docs)
      }
    })
  })
}

module.exports = { setupIpcHandlers }
