import { ThemeProvider, Container, Typography, Box, Grid } from '@mui/material'
import theme from './theme/theme'
import './i18n'
import CashPage from './components/pages/CashPage'
// import ProductSearch from './components/product/ProductSearch'
// import SearchBar from './components/product/SearchBar'
// import ProductList from './components/product/ProductList'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" my={3}>
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {' '}
              {/* Ajustez md={6} pour contrôler la largeur de la colonne */}
              {/* Les composants de la partie gauche, comme ProductPage, vont ici */}
              <CashPage />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Les composants de la partie droite vont ici */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
