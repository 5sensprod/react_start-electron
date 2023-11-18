import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from '../utils/ipcRenderer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/material'

const ProductList = () => {
  const [products, setProducts] = useState([])

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    ipcRendererHelper.send('get-products')

    // Gestionnaire pour écouter la réponse du processus principal
    const handleProductsData = (event, docs) => {
      if (Array.isArray(docs)) {
        setProducts(docs)
      } else {
        console.error('Les données reçues ne sont pas un tableau', docs)
      }
    }

    // Enregistrer le gestionnaire d'événements
    ipcRendererHelper.on('products-data', handleProductsData)

    // Nettoyage en retirant le gestionnaire d'événements
    return () => {
      ipcRendererHelper.removeAllListeners('products-data')
    }
  }, [])

  return (
    <div>
      <Paper elevation={2}>
        {' '}
        {/* Paper fournit un fond et une ombre, ce qui est optionnel */}
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              {product.name} - {product.surname} - {product.price} €
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box my={3}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Imprimer la Liste
        </Button>
      </Box>
    </div>
  )
}

export default ProductList
