import React, { useEffect } from 'react'
import { ThemeProvider, Grid, Box } from '@mui/material'
import theme from './theme/theme'
import './i18n'
import ProductSearch from './components/product/ProductSearch'
import { CartProvider } from './contexts/CartContext'
import { CompanyInfoProvider } from './contexts/CompanyInfoContext' // Importer le CompanyInfoProvider
import Cart from './components/Cart/Cart'
import SettingsForm from './ServerConfig'
import { ipcRendererHelper } from './components/utils/ipcRenderer'

import { updateBaseURL } from './api/axiosConfig'

const App = () => {
  useEffect(() => {
    const handleConfigUpdate = (newConfig) => {
      if (newConfig && newConfig.serverUrl) {
        updateBaseURL(newConfig.serverUrl)
      }
    }

    ipcRendererHelper.on('config-updated', handleConfigUpdate)

    return () => {
      ipcRendererHelper.removeAllListeners('config-updated')
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CompanyInfoProvider>
        <CartProvider>
          <Box sx={{ margin: '32px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProductSearch />
              </Grid>
              <Grid item xs={12} md={6}>
                <Cart />
              </Grid>
            </Grid>
            <SettingsForm />
          </Box>
        </CartProvider>
      </CompanyInfoProvider>
    </ThemeProvider>
  )
}

export default App
