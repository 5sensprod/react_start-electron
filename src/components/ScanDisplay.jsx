import React, { useState, useEffect } from 'react'

const ScanDisplayComponent = () => {
  const [scannedData, setScannedData] = useState('')

  useEffect(() => {
    // Initialiser la connexion WebSocket à la création du composant
    const ws = new WebSocket('ws://192.168.1.10:5000')

    ws.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    ws.onmessage = (event) => {
      console.log(`Received: ${event.data}`)
      // Mettre à jour l'état avec les données scannées reçues
      setScannedData(event.data)
    }

    ws.onerror = (event) => {
      // L'objet event ici ne contient généralement pas beaucoup d'informations sur l'erreur
      console.error('WebSocket Error: ', event)

      // Si vous avez accès à l'objet Error, il pourrait contenir plus de détails
      if (event && event.error) {
        console.error('WebSocket Error Details: ', event.error)
      }
    }

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }

    // Effectuer un nettoyage en fermant la connexion WebSocket lorsque le composant va être démonté
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <h2>Résultat du Scan</h2>
      <p>{scannedData}</p>
    </div>
  )
}

export default ScanDisplayComponent
