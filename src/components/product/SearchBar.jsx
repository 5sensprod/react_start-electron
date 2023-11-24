// src/components/product/SearchBar.jsx
import React, { useCallback } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import useGlobalScannedDataHandler from '../hooks/useGlobalScannedDataHandler'
import useWebSocket from '../hooks/useWebSocket'

const isAndroidWebView = navigator.userAgent.toLowerCase().includes('wv')

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  isScannerMode,
  setIsScannerMode,
}) => {
  useGlobalScannedDataHandler(isScannerMode, setSearchTerm)

  const handleWsMessage = useCallback(
    (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader()
        reader.onload = () => setSearchTerm(reader.result)
        reader.readAsText(event.data)
      } else {
        try {
          const data = JSON.parse(event.data)
          if (data && data.type === 'CHANGE_MODE') {
            setIsScannerMode(data.isScannerMode)
          } else {
            setSearchTerm(event.data)
          }
        } catch (error) {
          console.error('Error parsing message:', error)
        }
      }
    },
    [setSearchTerm, setIsScannerMode],
  )

  const handleWsOpen = useCallback(() => {
    console.log('WebSocket connection established')
  }, [])

  const handleWsError = useCallback((error) => {
    console.error('WebSocket error:', error)
  }, [])

  const handleWsClose = useCallback(() => {
    console.log('WebSocket closed')
    // Vous pouvez également envisager de gérer les reconnexions ou les notifications d'état ici.
  }, [])

  useWebSocket(
    'ws://192.168.1.10:5000',
    handleWsMessage,
    handleWsError,
    handleWsOpen,
    handleWsClose,
  )

  const handleScanClick = () => {
    if (window.Android) {
      window.Android.performScan() // Votre méthode Java exposée via `addJavascriptInterface`
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <TextField
      id="search-input"
      label="Rechercher un produit"
      type="search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isAndroidWebView && (
              <IconButton onClick={handleScanClick}>
                <DocumentScannerIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
