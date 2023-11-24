import { ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import './i18n'
import CashPage from './components/pages/CashPage'
// import ProductSearch from './components/product/ProductSearch'
// import SearchBar from './components/product/SearchBar'
// import ProductList from './components/product/ProductList'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CashPage />
    </ThemeProvider>
  )
}

export default App
