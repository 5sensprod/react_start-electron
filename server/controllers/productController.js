const {
  addProduct: addProductToDB,
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
  // La validation et la manipulation des images sont déjà gérées par les middlewares
  addProductToDB(req.body, (err, newDoc) => {
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
        // Ici vous pouvez ajouter les URLs d'images si nécessaire
      })
    }
  })
}
