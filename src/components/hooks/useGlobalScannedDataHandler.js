import { useEffect } from 'react'

const useGlobalScannedDataHandler = (isScannerMode, setSearchTerm) => {
  useEffect(() => {
    // Définir une fonction globale que le WebView pourra appeler
    window.handleScannedData = (scannedData) => {
      if (isScannerMode) {
        setSearchTerm(scannedData)
      }
    }

    // Nettoyer la fonction globale lors du démontage
    return () => {
      delete window.handleScannedData
    }
  }, [isScannerMode, setSearchTerm])
}

export default useGlobalScannedDataHandler
