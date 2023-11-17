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
})

module.exports = db
