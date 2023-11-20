const {
  addProduct,
  getProducts,
} = require('../../main/database/productDbOperations')
const productSchema = require('../schemas/productSchema') // Assurez-vous que le chemin d'accès est correct

exports.getProducts = (req, res) => {
  getProducts((err, products) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits',
      })
    } else {
      res.json({ success: true, products })
    }
  })
}

exports.addProduct = (req, res) => {
  // Validation des données du produit
  const { error, value } = productSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Les données du produit ne sont pas valides',
      error: error.details[0].message,
    })
  }

  // Ajout du produit avec les données validées
  addProduct(value, (err, newDoc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'ajout du produit",
        error: err,
      })
    } else {
      res.status(201).json({
        success: true,
        message: 'Produit ajouté avec succès',
        product: newDoc,
      })
    }
  })
}
