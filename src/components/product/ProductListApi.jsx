import React, { useState, useEffect } from 'react'
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

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'photos',
        Cell: ({ value }) =>
          value && value.length > 0 ? (
            <img
              src={`${serverBaseUrl}/${value[0].replace(/\\/g, '/')}`}
              alt={`Product`}
              style={{ maxWidth: '50px', maxHeight: '40px' }}
            />
          ) : null,
      },
      {
        Header: 'Référence',
        accessor: 'reference',
      },
      {
        Header: 'Marque',
        accessor: 'marque',
      },
      {
        Header: 'Prix public',
        accessor: 'prixVente',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Catégorie',
        accessor: 'categorie',
      },
    ],
    [serverBaseUrl],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: products })

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
