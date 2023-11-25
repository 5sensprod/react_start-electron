import React from 'react'
import { ThemeProvider, Grid, Box } from '@mui/material'
import theme from './theme/theme'
import './i18n'
import ProductSearch from './components/product/ProductSearch'
import { CartProvider } from './contexts/CartContext'
import Cart from './components/Cart/Cart'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Box sx={{ marginTop: '16px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProductSearch />
            </Grid>
            <Grid item xs={12} md={6}>
              <Cart />
            </Grid>
          </Grid>
        </Box>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
