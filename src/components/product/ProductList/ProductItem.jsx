// src/components/product/ProductList/ProductItem.js
import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'

const ProductItem = ({ product }) => {
  // La logique pour ajouter au panier peut être ajoutée ici ou passée en prop.
  const addToCart = () => {
    // Implementer l'ajout au panier
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography color="textSecondary">{product.description}</Typography>
        <Typography variant="body2" component="p">
          Prix: {product.prixVente}
          <br />
          Référence: {product.reference}
        </Typography>
        <Button onClick={addToCart} size="small">
          Ajouter au panier
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductItem
