const Datastore = require('nedb')
const path = require('path')
const { app } = require('electron')

// Calculer le chemin de base pour la base de données en fonction de l'environnement
const isPackaged = app.isPackaged // ou utilisez 'process.env.NODE_ENV === "production"' si vous définissez NODE_ENV
const baseDatabasePath = isPackaged
  ? path.join(process.resourcesPath, 'data') // Chemin en production
  : path.join(__dirname, '../../data') // Chemin en développement

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
