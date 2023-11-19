const Datastore = require('nedb')
const path = require('path')
let app

if (
  process.type === 'renderer' ||
  (process.versions && process.versions.electron)
) {
  // On est dans Electron
  const electron = require('electron')
  app = electron.app || electron.remote.app
} else {
  // On est dans Node.js
  app = {
    getPath: () => path.join(__dirname, '../../data'), // ou n'importe quel autre chemin approprié
  }
}

const userDataPath = app.getPath('userData') // Chemin vers les données de l'utilisateur

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

module.exports = db
