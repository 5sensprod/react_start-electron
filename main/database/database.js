const Datastore = require('nedb')
const path = require('path')
const { app } = require('electron')

let db = {}

db.users = new Datastore({
  filename: path.join(app.getPath('userData'), '/users.db'),
  autoload: true,
})

db.products = new Datastore({
  filename: path.join(app.getPath('userData'), '/products.db'),
  autoload: true,
})

db.categories = new Datastore({
  filename: path.join(app.getPath('userData'), '/categories.db'),
  autoload: true,
  onload: (err) => {
    if (err) {
      console.error('Error loading the database', err)
      if (err.message.includes('10% of the data file is corrupt')) {
        // Tentative de réparation du fichier de données corrompu
        console.log('Attempting to repair the database file')
        db.categories.persistence.compactDatafile()
      }
    }
  },
})

module.exports = db
