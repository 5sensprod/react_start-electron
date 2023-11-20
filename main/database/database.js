const Datastore = require('nedb')
const path = require('path')

// Chemin constant pour le dossier de données de l'application
const baseDatabasePath = path.join(__dirname, '../../data') // Chemin relatif au répertoire de la base de données

let db = {}

db.users = new Datastore({
  filename: path.join(baseDatabasePath, 'users.db'),
  autoload: true,
})

db.products = new Datastore({
  filename: path.join(baseDatabasePath, 'products.db'),
  autoload: true,
})

db.categories = new Datastore({
  filename: path.join(baseDatabasePath, 'categories.db'),
  autoload: true,
})

module.exports = db

//pour le buid
// const Datastore = require('nedb')
// const path = require('path')
// const { app } = require('electron')

// const isPackaged = app.isPackaged
// const baseDatabasePath = isPackaged
//   ? path.join(process.resourcesPath, 'data')
//   : path.join(__dirname, '../../data')

// let db = {}

// db.users = new Datastore({
//   filename: path.join(baseDatabasePath, 'users.db'),
//   autoload: true,
// })

// db.products = new Datastore({
//   filename: path.join(baseDatabasePath, 'products.db'),
//   autoload: true,
// })

// db.categories = new Datastore({
//   filename: path.join(baseDatabasePath, 'categories.db'),
//   autoload: true,
// })

// module.exports = db
