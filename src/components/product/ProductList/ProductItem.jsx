import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const serverBaseUrl = 'http://localhost:5000'

const ProductItem = ({ product, addToCart }) => {
  // La logique pour ajouter au panier peut être ajoutée ici ou passée en prop.
  const handleAddToCartClick = () => {
    addToCart(product)
  }

  const imageUrl =
    product.photos && product.photos.length > 0
      ? `${serverBaseUrl}/${product.photos[0].replace(/\\/g, '/')}`
      : 'placeholder-image-url'

  return (
    <Card variant="outlined">
      <Grid container spacing={1}>
        <Grid
          item
          xs={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            alt={product.reference}
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '4px',
              marginLeft: '10px',
            }}
            image={
              product.photos && product.photos.length > 0
                ? imageUrl
                : './default.png'
            }
          />
        </Grid>
        <Grid item xs={7}>
          <CardContent style={{ paddingBottom: '5px' }}>
            <Typography variant="h6" component="h2">
              {product.reference}
            </Typography>
            <Typography color="textSecondary">
              Gencode : {product.gencode}
              <br />
              Marque : {product.marque}
              <br />
              Stock : {product.stock ? product.stock : 'Indisponible'}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: 'auto' }}
            >
              Prix : {product.prixVente}€
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleAddToCartClick}
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              padding: '0',
              borderRadius: '50%',
              lineHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddIcon style={{ color: '#d8dde3' }} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductItem
