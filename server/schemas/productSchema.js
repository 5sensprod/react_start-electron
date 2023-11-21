const Joi = require('joi')

const productSchema = Joi.object({
  reference: Joi.string().required(),
  marque: Joi.string().allow(null).default(null),
  categorie: Joi.string().allow(null).default(null),
  sousCategorie: Joi.string().allow(null).default(null),
  prixVente: Joi.number().required(),
  prixAchat: Joi.number().allow(null).default(null),
  description: Joi.string().allow(null).default(null),
  descriptionCourte: Joi.string().allow(null).default(null),
  variable: Joi.boolean().required(),
  gencode: Joi.string().allow(null).default(null),
  stock: Joi.number().integer().min(0).allow(null).default(null),
  ficheTechnique: Joi.string().uri().allow(null).default(null),
  photos: Joi.array().items(Joi.string()).allow(null).default(null),
  // ... le reste
  videos: Joi.array().items(Joi.string().uri()).allow(null).default(null),
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
    .allow(null)
    .default(null),
})

module.exports = productSchema
