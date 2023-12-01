const { app } = require('electron')
const { ipcMain } = require('electron')
const { addProduct, getProducts } = require('./database/productDbOperations.js')
const {
  addCategory,
  getCategories,
  getParentCategories,
  getChildCategories,
} = require('./database/categoryDbOperations.js')
const fs = require('fs')
const path = require('path')

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

  ipcMain.on('save-config', (event, newConfig) => {
    console.log('Received new config from renderer:', newConfig)

    const configPath = path.join(app.getPath('userData'), 'config.json')
    try {
      console.log('Saving new config to:', configPath)
      fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2))
      console.log('Config saved successfully')
      event.reply('config-saved', true)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error)
      event.reply('config-saved', false)
    }
  })

  ipcMain.handle('request-config', async (event) => {
    try {
      const configPath = path.join(app.getPath('userData'), 'config.json')
      const configFile = fs.readFileSync(configPath, 'utf8')
      const config = JSON.parse(configFile)
      return config // Retourne la configuration lue
    } catch (error) {
      console.error('Erreur lors de la lecture de la configuration:', error)
      // Gérer l'erreur, par exemple, en retournant une valeur par défaut ou une erreur
      return { error: error.message }
    }
  })

  // ipcMain.on('request-config', (event) => {
  //   const configPath = path.join(app.getPath('userData'), 'config.json')
  //   try {
  //     const configFile = fs.readFileSync(configPath)
  //     const config = JSON.parse(configFile)
  //     event.reply('config', config)
  //   } catch (error) {
  //     console.error('Erreur lors de la lecture de la configuration:', error)
  //     event.reply('config', {})
  //   }
  // })

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
