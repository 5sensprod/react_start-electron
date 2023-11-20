// ProductListApi.jsx
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

  // Générer les colonnes en mappant les clés des produits
  const columns = useMemo(() => {
    if (products.length === 0) {
      return []
    }

    const sampleProduct = products[0]
    const mappedColumns = Object.keys(sampleProduct).map((key) => {
      // Pour les champs qui nécessitent un rendu personnalisé, définissez-les ici
      if (key === 'ficheTechnique') {
        return {
          Header: 'Fiche Technique',
          accessor: key,
          Cell: ({ value }) =>
            value ? (
              <Link href={value} target="_blank">
                PDF
              </Link>
            ) : (
              'N/A'
            ),
        }
      }
      // D'autres clés avec rendu personnalisé peuvent être ajoutées ici
      // ...

      // Pour les autres clés, utilisez le mappage automatique
      return {
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
      }
    })

    return mappedColumns
  }, [products])

  // Utilisation de useTable hook
  const tableInstance = useTable({
    columns,
    data: products,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  // Rendu de la table avec les composants MUI
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
