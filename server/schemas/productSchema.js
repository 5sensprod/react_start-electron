const Joi = require('joi')

const productSchema = Joi.object({
  reference: Joi.string().required(),
  marque: Joi.string().allow(null).default(null),
  categorie: Joi.string().allow(null).default(null),
  sousCategorie: Joi.string().allow(null).default(null),
  prixVente: Joi.alternatives()
    .try(Joi.number(), Joi.string().allow(''))
    .required(),
  prixAchat: Joi.number().allow(null).default(null),
  description: Joi.string().allow(null).default(null),
  descriptionCourte: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .allow(null)
    .default(null),
  variable: Joi.boolean().allow(null).default(null),
  gencode: Joi.string().allow(null).default(null),
  stock: Joi.number().integer().min(0).allow(null).default(null),
  ficheTechnique: Joi.string().uri().allow(null).default(null),
  photos: Joi.array().items(Joi.string()).allow(null).default(null),
  // ... le reste
  videos: Joi.array().items(Joi.string().uri()).allow(null).default(null),
  SKU: Joi.alternatives()
    .try(
      Joi.array().items(
        Joi.object({
          diapason: Joi.string(),
          gencode: Joi.string(),
          prixAchat: Joi.number(),
          prixVente: Joi.number(),
          stock: Joi.number().integer().min(0),
        }),
      ),
      Joi.string().regex(/^\d+$/),
    )
    .allow(null)
    .default(null),
})

module.exports = productSchema
