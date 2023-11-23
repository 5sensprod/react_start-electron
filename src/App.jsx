import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import './i18n'
import ProductSearch from './components/product/ProductSearch'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" my={3}>
        <Typography variant="h4" gutterBottom>
          Liste des Produits
        </Typography>
        <Box my={4}>
          <ProductSearch />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
