// hooks/useProducts.js
import { useState, useEffect } from 'react'
import { getProducts } from '../../api/productService'

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await getProducts()
        setProducts(response.products)
        setError(null)
      } catch (err) {
        setError(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useProducts
