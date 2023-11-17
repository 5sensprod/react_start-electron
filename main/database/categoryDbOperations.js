const db = require('./database')

const addCategory = (category, callback) => {
  db.categories.insert(category, callback)
}

const getCategories = (callback) => {
  db.categories.find({}, callback)
}

module.exports = { addCategory, getCategories }
