import React, { useState, useEffect } from 'react'
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
  const [serverUrl, setServerUrl] = useState('')

  useEffect(() => {
    // Demander la configuration actuelle au démarrage
    ipcRendererHelper.invoke('request-config').then((config) => {
      if (config && config.serverUrl) {
        setServerUrl(config.serverUrl)
        updateBaseURL(config.serverUrl) // Mettre à jour l'URL de base d'Axios
      }
    })

    const handleConfigUpdate = (newConfig) => {
      if (newConfig && newConfig.serverUrl) {
        setServerUrl(newConfig.serverUrl)
        updateBaseURL(newConfig.serverUrl) // Mettre à jour l'URL de base d'Axios
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
                <ProductSearch serverUrl={serverUrl} />
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
