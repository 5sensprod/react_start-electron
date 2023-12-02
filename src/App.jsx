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
import { fetchConfig, getConfig } from './api/configService'

const App = () => {
  const [serverUrl, setServerUrl] = useState('')
  const [isURLUpdated, setIsURLUpdated] = useState(false) // Nouvel état pour suivre la mise à jour

  const updateURL = async (url) => {
    await updateBaseURL(url) // Attendre la mise à jour de l'URL
    setIsURLUpdated(true) // Indiquer que l'URL a été mise à jour
  }

  useEffect(() => {
    ipcRendererHelper.invoke('request-config').then((config) => {
      if (config && config.serverUrl) {
        setServerUrl(config.serverUrl)
        updateURL(config.serverUrl) // Mettre à jour l'URL de manière asynchrone
      }
    })

    const handleConfigUpdate = (newConfig) => {
      if (newConfig && newConfig.serverUrl) {
        setServerUrl(newConfig.serverUrl)
        updateURL(newConfig.serverUrl) // Mettre à jour l'URL de manière asynchrone
      }
    }

    ipcRendererHelper.on('config-updated', handleConfigUpdate)

    return () => {
      ipcRendererHelper.removeAllListeners('config-updated')
    }
  }, [])

  // Afficher un indicateur de chargement si l'URL n'est pas encore mise à jour
  if (!isURLUpdated) {
    console.log('Fetching configuration via API as fallback')
    fetchConfig()
      .then(() => {
        const config = getConfig()
        console.log('Config fetched via API:', config)
        if (config && config.serverUrl) {
          setServerUrl(config.serverUrl)
          updateURL(config.serverUrl)
        }
      })
      .catch((error) => {
        console.error('Error fetching configuration:', error)
      })

    return <div>Chargement configuration...</div>
  }
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
