const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.get('/get-products', productController.getProducts)
router.post('/import-products', productController.importProducts)

module.exports = router
