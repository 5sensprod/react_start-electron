const fs = require('fs')
const path = require('path')
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
  const { error, value } = productSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Les données du produit ne sont pas valides',
      error: error.details[0].message,
    })
  }

  // Copiez les images dans le dossier 'catalogue'
  const reference = value.reference
  const photos = value.photos || []
  const destinationDir = path.join(__dirname, '..', 'catalogue', reference)

  try {
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }

    photos.forEach((photoPath) => {
      const filename = path.basename(photoPath)
      const destPath = path.join(destinationDir, filename)
      fs.copyFileSync(photoPath, destPath)
    })

    // Mettez à jour le chemin des photos pour utiliser le nouveau chemin
    value.photos = photos.map((photo) =>
      path.join('catalogue', reference, path.basename(photo)),
    )

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la copie des images',
      error: err.message,
    })
  }
}
