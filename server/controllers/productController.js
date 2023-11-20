const {
  addProduct,
  getProducts,
} = require('../../main/database/productDbOperations')

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
  addProduct(req.body, (err, newDoc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'ajout du produit",
      })
    } else {
      res.json({
        success: true,
        message: 'Produit ajouté avec succès',
        product: newDoc,
      })
    }
  })
}
