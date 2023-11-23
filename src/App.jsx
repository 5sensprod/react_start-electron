import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import './i18n'
// import ProductList from './components/product/ProductListApi'
import ProductSearch from './components/product/ProductSearch'
// import AddProductForm from './components/AddProductForm '
import ScanDisplayComponent from './components/ScanDisplay'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" my={3}>
        {/* <Typography variant="h4" gutterBottom>
          Ajouter Fiche Produit
        </Typography>
        <Box my={4}>
          <AddProductForm />
        </Box> */}
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          {/* <ProductList /> */}
          {/* <ScanDisplayComponent /> */}
          <ProductSearch />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
