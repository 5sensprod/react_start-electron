const Datastore = require('nedb')
const path = require('path')
let app

// Vérifiez si 'electron' est dans les versions des processus, ce qui indique que nous sommes dans Electron.
if (process.versions.hasOwnProperty('electron')) {
  const electron = require('electron')
  app = electron.app || electron.remote.app
} else {
  // Si nous ne sommes pas dans Electron, définissez un chemin par défaut ou quittez le processus.
  console.error("Ce script doit être exécuté dans l'environnement Electron.")
  process.exit(1) // Arrêtez l'exécution si nous ne sommes pas dans Electron.
}

const userDataPath = app.getPath('userData')

let db = {}

db.users = new Datastore({
  filename: path.join(userDataPath, 'users.db'),
  autoload: true,
})

db.products = new Datastore({
  filename: path.join(userDataPath, 'products.db'),
  autoload: true,
})

db.categories = new Datastore({
  filename: path.join(userDataPath, 'categories.db'),
  autoload: true,
})

db.invoices = new Datastore({
  filename: path.join(userDataPath, 'invoices.db'),
  autoload: true,
})

module.exports = db
