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
import { getProducts } from '../../api/productService' // Assurez-vous que le chemin est correct

const ProductSearch = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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
    const refIncludes = product.reference
      ? product.reference.toLowerCase().includes(searchTerm.toLowerCase())
      : false
    const brandIncludes = product.marque
      ? product.marque.toLowerCase().includes(searchTerm.toLowerCase())
      : false
    const gencodeIncludes = product.gencode
      ? product.gencode.includes(searchTerm)
      : false

    return refIncludes || brandIncludes || gencodeIncludes
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
