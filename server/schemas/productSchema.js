const Joi = require('joi')

const productSchema = Joi.object({
  reference: Joi.string().required(),
  marque: Joi.string().allow(null),
  categorie: Joi.string().allow(null),
  sousCategorie: Joi.string().allow(null),
  prixVente: Joi.number().required(),
  prixAchat: Joi.number().allow(null),
  description: Joi.string().allow(null),
  descriptionCourte: Joi.string().allow(null),
  variable: Joi.boolean().required(),
  gencode: Joi.string().allow(null),
  stock: Joi.number().integer().min(0).allow(null),
  ficheTechnique: Joi.string().uri().allow(null),
  photos: Joi.array().items(Joi.string()).allow(null),
  // ... le reste
  videos: Joi.array().items(Joi.string().uri()).allow(null),
  SKU: Joi.array()
    .items(
      Joi.object({
        diapason: Joi.string(),
        gencode: Joi.string(),
        prixAchat: Joi.number(),
        prixVente: Joi.number(),
        stock: Joi.number().integer().min(0),
      }),
    )
    .allow(null),
})

module.exports = productSchema
