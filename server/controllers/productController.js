const { getProducts } = require('../../main/database/productDbOperations')

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

exports.importProducts = (req, res) => {
  // Logique pour importer les produits...
}
