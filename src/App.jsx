import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import './i18n'
import ProductPage from './components/pages/ProductPage'
// import ProductSearch from './components/product/ProductSearch'
// import SearchBar from './components/product/SearchBar'
// import ProductList from './components/product/ProductList'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" my={3}>
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          {/* <ProductSearch /> */}
          {/* <SearchBar />
          <ProductList /> */}
          <ProductPage />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
