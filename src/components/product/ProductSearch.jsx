import React, { useState, useCallback, useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import useGlobalScannedDataHandler from '../hooks/useGlobalScannedDataHandler'
import useWebSocket from '../hooks/useWebSocket'
import useProducts from '../hooks/useProducts'
import useSearch from '../hooks/useSearch'
const isAndroidWebView = navigator.userAgent.toLowerCase().includes('wv')

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isScannerMode, setIsScannerMode] = useState(true)
  const { products, loading, error } = useProducts()
  const { addToCart } = useContext(CartContext)
  const filteredProducts = useSearch(products, searchTerm)

  const handleScanClick = () => {
    if (window.Android) {
      window.Android.performScan() // Votre méthode Java exposée via `addJavascriptInterface`
    }
  }
  const handleAddToCart = (product) => {
    addToCart(product)
  }

  // Définir les fonctions de rappel pour les événements WebSocket
  const handleWsMessage = useCallback((event) => {
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
  }, [])

  const handleWsOpen = useCallback(() => {
    console.log('WebSocket connection established')
  }, [])
  const handleWsError = useCallback((error) => {
    console.error('WebSocket error:', error)
  }, [])
  const handleWsClose = useCallback(() => {
    console.log('WebSocket closed')
  }, [])

  useWebSocket(
    'ws://192.168.1.10:5000',
    handleWsMessage,
    handleWsError,
    handleWsOpen,
    handleWsClose,
  )

  useGlobalScannedDataHandler(isScannerMode, setSearchTerm)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
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
              {/* Autres icônes ou éléments ici */}
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Référence</TableCell>
              <TableCell>Marque</TableCell>
              <TableCell>Gencode</TableCell>
              <TableCell>Prix de vente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product._id}
                hover // Optionnel: ajoute un effet visuel au survol de la ligne
                style={{ cursor: 'pointer' }} // Rend la ligne visuellement cliquable
                onClick={() => handleAddToCart(product)} // Appelle handleAddToCart lorsque la ligne est cliquée
              >
                <TableCell>{product.reference}</TableCell>
                <TableCell>{product.marque}</TableCell>
                <TableCell>{product.gencode}</TableCell>
                <TableCell>{product.prixVente} €</TableCell>
                {/* Vous pouvez ajouter un bouton ici si vous voulez une icône d'ajout au panier */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductSearch
