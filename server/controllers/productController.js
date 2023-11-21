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

  // Vérifiez si 'SKU' a un format numérique
  if (req.body.SKU && !isNaN(Number(req.body.SKU))) {
    req.body.gencode = req.body.SKU // Attribuer la valeur de SKU à gencode
    req.body.variable = false // Mettre variable à false car SKU est un format numérique
  } else if (req.body.gencode === null || req.body.gencode === undefined) {
    req.body.variable = true // Si 'gencode' est null, alors 'variable' doit être true
  } else {
    // Si 'gencode' est fourni, vous pouvez soit laisser 'variable' tel qu'il est,
    // soit définir une logique par défaut ici.
    req.body.variable = req.body.variable || false
  }

  // Ajouter le produit à la base de données
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
