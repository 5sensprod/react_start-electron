const productSchema = {
  name: { type: String, required: true },
  surname: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  // ajouter d'autres champs et règles de validation selon les besoins
}

module.exports = productSchema
