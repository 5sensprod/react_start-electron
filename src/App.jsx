import { ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import './i18n'
import ProductSearch from './components/product/ProductSearch'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProductSearch />
    </ThemeProvider>
  )
}

export default App
