import React, { useState } from 'react'
import SearchBar from '../product/SearchBar'
import ProductList from '../product/ProductList'
const CashPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isScannerMode, setIsScannerMode] = useState(false)

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isScannerMode={isScannerMode}
        setIsScannerMode={setIsScannerMode}
      />
      <ProductList searchTerm={searchTerm} />
    </div>
  )
}

export default CashPage
