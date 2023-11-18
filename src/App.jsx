import React, { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

import './i18n'
import ProductCategoryForm from './components/ProductCategoryForm'
import ProductList from './components/product/ProductList'
import ParentCategoryAutocomplete from './components/ui/ParentCategoryAutocomplete'

const App = () => {
  const [reloadProducts, setReloadProducts] = useState(false)

  const handleProductAdded = useCallback(() => {
    setReloadProducts((prev) => !prev)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" my={3}>
        <Box my={4}>
          <ParentCategoryAutocomplete />
          <Typography variant="h4" gutterBottom>
            Tous les articles
          </Typography>
          <ProductCategoryForm onProductAdded={handleProductAdded} />
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
