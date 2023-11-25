import React, { useState, useCallback, useEffect } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useWebSocket from './hooks/useWebSocket'

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Gestionnaire pour les messages WebSocket entrants
  const handleWsMessage = useCallback((event) => {
    if (event.data instanceof Blob) {
      // Si le message est un Blob, nous devons le lire comme du texte
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result)
          if (data && data.action === 'search_results') {
            // Supposons que 'data.data' est le tableau des résultats de recherche
            setSearchResults(data.data)
          }
        } catch (error) {
          console.error('Error parsing Blob data:', error)
        }
      }
      reader.readAsText(event.data)
    } else {
      // Si ce n'est pas un Blob, on suppose que c'est une chaîne JSON
      try {
        const data = JSON.parse(event.data)
        if (data && data.action === 'search_results') {
          setSearchResults(data.data)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
  }, [])

  // Gestionnaires pour les événements WebSocket
  const handleWsOpen = useCallback(() => console.log('WebSocket connected'), [])
  const handleWsError = useCallback(
    (error) => console.error('WebSocket error:', error),
    [],
  )
  const handleWsClose = useCallback(
    () => console.log('WebSocket disconnected'),
    [],
  )

  // Établir la connexion WebSocket
  const { sendMessage } = useWebSocket(
    'ws://192.168.1.10:5000', // Remplacez par l'URL de votre serveur WebSocket
    handleWsMessage,
    handleWsError,
    handleWsOpen,
    handleWsClose,
  )

  // Gestionnaire pour les changements dans la barre de recherche
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    // Envoyer une requête de recherche chaque fois que la recherche change
    sendMessage(JSON.stringify({ action: 'search', data: newSearchTerm }))
  }

  // Lancer une recherche initiale lors du montage pour récupérer tous les produits
  useEffect(() => {
    // La requête initiale pour obtenir tous les produits
    sendMessage(JSON.stringify({ action: 'search', data: '' }))
  }, [sendMessage])
  const handleSearch = () => {
    // Vous pouvez ajouter une validation ou une logique supplémentaire ici avant d'envoyer la recherche
    sendMessage(JSON.stringify({ action: 'search', data: searchTerm }))
  }

  return (
    <div>
      <TextField
        id="search-product-input"
        label="Rechercher un produit"
        type="text"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div>
        {/* Rendu conditionnel des résultats de la recherche */}
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.reference}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default ProductSearch
