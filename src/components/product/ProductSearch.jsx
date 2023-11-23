import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { getProducts } from '../../api/productService'

const ProductSearch = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Établissement de la connexion WebSocket
    const ws = new WebSocket('ws://192.168.1.10:5000')

    ws.onmessage = (event) => {
      // Vérifiez si le message est un Blob
      if (event.data instanceof Blob) {
        // Créer un FileReader pour lire le Blob
        const reader = new FileReader()

        // Définir ce qui se passe lorsque le FileReader a fini de lire le Blob
        reader.onload = () => {
          // Le résultat est un string de données lues depuis le Blob
          setSearchTerm(reader.result.toString())
        }

        // Lire le contenu du Blob en tant que texte
        reader.readAsText(event.data)
      } else {
        // Si ce n'est pas un Blob, on convertit directement les données en texte
        setSearchTerm(event.data.toString())
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onopen = () => {
      console.log('WebSocket connection established')
    }

    // Nettoyage de la connexion WebSocket lors du démontage du composant
    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts() // Assurez-vous que cette fonction est correctement implémentée pour récupérer les produits
        setProducts(response.products)
      } catch (error) {
        console.error('There was an error fetching the products', error)
      }
    }

    fetchProducts()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toString().toLowerCase()
    const refIncludes = product.reference
      ? product.reference.toLowerCase().includes(lowerCaseSearchTerm)
      : false
    const brandIncludes = product.marque
      ? product.marque.toLowerCase().includes(lowerCaseSearchTerm)
      : false
    const gencodeIncludes = product.gencode
      ? product.gencode.toString().includes(lowerCaseSearchTerm)
      : false
    const skuIncludes =
      product.SKU &&
      Array.isArray(product.SKU) &&
      product.SKU.some(
        (sku) =>
          sku.diapason.toLowerCase().includes(lowerCaseSearchTerm) ||
          sku.gencode.toString().includes(lowerCaseSearchTerm),
      )

    return refIncludes || brandIncludes || gencodeIncludes || skuIncludes
  })

  return (
    <div>
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
              <IconButton>
                <SearchIcon />
              </IconButton>
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
              <TableRow key={product._id}>
                <TableCell>{product.reference}</TableCell>
                <TableCell>{product.marque}</TableCell>
                <TableCell>{product.gencode}</TableCell>
                <TableCell>{product.prixVente}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductSearch
