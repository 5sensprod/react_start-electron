const Datastore = require('nedb')
const path = require('path')

// Utilisez une fonction pour déterminer si l'application est empaquetée avec Electron.
function getBaseDatabasePath() {
  // Vérifiez si 'app' est disponible via 'electron' pour déterminer si vous êtes dans l'environnement Electron.
  let electronApp
  try {
    electronApp = require('electron').app
  } catch (e) {
    // Si 'electron' ne peut pas être chargé, alors vous n'êtes pas dans l'environnement Electron.
    electronApp = null
  }

  // Si dans Electron et empaqueté, utilisez 'process.resourcesPath', sinon utilisez le chemin de développement.
  if (electronApp && electronApp.isPackaged) {
    return path.join(process.resourcesPath, 'data')
  } else {
    return path.join(__dirname, '../../data')
  }
}

const baseDatabasePath = getBaseDatabasePath()

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
