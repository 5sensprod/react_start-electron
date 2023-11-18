const db = require('./database')

const addCategory = (category, callback) => {
  db.categories.insert(category, callback)
}

const getCategories = (callback) => {
  db.categories.find({}, callback)
}

const getParentCategories = (callback) => {
  db.categories.find({ parentId: null }, (err, docs) => {
    console.log('Parent Categories:', docs)
    callback(err, docs)
  })
}

const getChildCategories = (parentId, callback) => {
  db.categories.find({ parentId: parentId }, callback)
}

module.exports = {
  addCategory,
  getCategories,
  getParentCategories,
  getChildCategories,
}
