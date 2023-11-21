const productSchema = require('../schemas/productSchema')

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Les données du produit ne sont pas valides',
      error: error.details[0].message,
    })
  }
  next()
}
