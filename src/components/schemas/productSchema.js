const productSchema = {
  name: { type: String, required: true },
  gencode: { type: Number, required: false },
  ugs: { type: Number, required: false, min: 0 },
  price: { type: Number, required: true, min: 0 },
  purchasePrice: { type: Number, required: false, min: 0 },
  brand: { type: String, required: false },
  shortDescription: { type: String, required: false },
  description: { type: String, required: false },
  photos: { type: String, required: false },
  videos: { type: String, required: false },
  files: { type: String, required: false },
  // ajouter d'autres champs et règles de validation selon les besoins
}

module.exports = productSchema
