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

  // Création des colonnes pour react-table
  const columns = useMemo(
    () =>
      products.length > 0
        ? Object.keys(products[0]).map((key) => ({
            Header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize headers
            accessor: key,
          }))
        : [],
    [products],
  )

  // Utilisation de useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    })

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
