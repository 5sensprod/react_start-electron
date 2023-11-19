import React, { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

import './i18n'
import ProductList from './components/product/ProductList'
import AddProductForm from './components/AddProductForm '

const App = () => {
  const [reloadProducts, setReloadProducts] = useState(false)

  const handleProductAdded = useCallback(() => {
    setReloadProducts((prev) => !prev)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" my={3}>
        <Typography variant="h4" gutterBottom>
          Ajouter Fiche Produit
        </Typography>
        <Box my={4}>
          <AddProductForm onProductAdded={handleProductAdded} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          <ProductList key={reloadProducts.toString()} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
