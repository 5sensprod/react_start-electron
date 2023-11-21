const productSchema = require('../schemas/productSchema')

module.exports = (req, res, next) => {
  // Options de validation pour ajouter des valeurs par défaut
  const options = {
    abortEarly: false, // trouver toutes les erreurs
    allowUnknown: true, // ignorer les clés inconnues
    stripUnknown: true, // retirer les clés inconnues
    presence: 'optional', // les clés sont optionnelles
  }

  // Valider et ajouter des valeurs null par défaut
  const { error, value } = productSchema.validate(req.body, options)

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Les données du produit ne sont pas valides',
      error: error.details.map((detail) => detail.message), // retourner tous les messages d'erreur
    })
  }

  // Affecter les valeurs validées à req.body
  req.body = value
  next()
}
