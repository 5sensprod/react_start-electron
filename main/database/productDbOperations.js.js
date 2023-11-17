const db = require('./database')

const addProduct = (product, callback) => {
  db.products.insert(product, callback)
}

const getProducts = (callback) => {
  db.products.find({}, callback)
}

module.exports = { addProduct, getProducts }
