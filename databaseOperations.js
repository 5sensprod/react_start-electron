// databaseOperations.js
const db = require('./database')

const addProduct = (productName, productPrice, callback) => {
  db.products.insert({ name: productName, price: productPrice }, callback)
}

const getProducts = (callback) => {
  db.products.find({}, callback)
}

module.exports = { addProduct, getProducts }
