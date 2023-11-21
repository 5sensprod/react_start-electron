const express = require('express')
const productController = require('../controllers/productController')
const validateProductMiddleware = require('../middlewares/validateProduct')
const handleProductImagesMiddleware = require('../middlewares/handleProductImages')
const router = express.Router()

router.get('/get-products', productController.getProducts)
router.post(
  '/add-product',
  validateProductMiddleware,
  handleProductImagesMiddleware,
  productController.addProduct,
)

module.exports = router
