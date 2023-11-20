import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import { getProducts } from '../../api/productService'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from '@mui/material'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const serverBaseUrl = 'http://localhost:5000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response.products)
      } catch (error) {
        console.error('There was an error fetching the products', error)
      }
    }

    fetchProducts()
  }, [])

  const columns = useMemo(() => {
    if (products.length === 0) {
      return []
    }

    // Nous allons définir une fonction pour chaque type de donnée que nous voulons afficher différemment
    const renderCell = (key, value) => {
      switch (key) {
        case 'ficheTechnique':
          return value ? (
            <Link href={value} target="_blank">
              PDF
            </Link>
          ) : (
            'N/A'
          )
        case 'photos':
          // Pour les photos, nous retournons des images au lieu de liens
          return (
            <div>
              {value.map((photo, index) => (
                <img
                  key={index}
                  src={`${serverBaseUrl}/${photo.replace(/\\/g, '/')}`} // Remplacez les backslashes par des slashes pour les URLs
                  alt={`Product ${index}`} // Texte alternatif descriptif
                  style={{ maxWidth: '100px', maxHeight: '100px' }} // Style exemple
                />
              ))}
            </div>
          )
        case 'videos':
          // Pour les vidéos, nous retournons des liens cliquables
          return value.map((video, index) => (
            <Link key={index} href={video} target="_blank">{`Video ${
              index + 1
            }`}</Link>
          ))
        case 'SKU':
          // Pour SKU, qui est un tableau d'objets, nous affichons chaque propriété
          return value.map((sku, index) => (
            <div key={index}>
              {Object.entries(sku).map(([field, val]) => (
                <p key={field}>{`${field}: ${val}`}</p>
              ))}
            </div>
          ))
        default:
          // Par défaut, nous retournons simplement la valeur
          return value
      }
    }

    // Maintenant nous mappons les clés des produits à des colonnes
    return Object.keys(products[0]).map((key) => {
      return {
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
        Cell: ({ cell: { value } }) => renderCell(key, value),
      }
    })
  }, [products, serverBaseUrl])

  const tableInstance = useTable({ columns, data: products })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductList
