const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.get('/get-products', productController.getProducts)
router.post('/add-product', productController.addProduct)

module.exports = router