// src/scanner/BarcodeScanner.js

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

const codeReader = new BrowserMultiFormatReader()

const sendScannedDataToServer = (scannedData) => {
  // Remplacez 'adresse_du_serveur' par l'adresse IP locale de votre serveur
  fetch('http://192.168.1.10:5000/scan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: scannedData }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error))
}

const startScanner = (videoElem, callback) => {
  codeReader.decodeFromVideoDevice(null, videoElem, (result, err) => {
    if (result) {
      // Appeler le callback avec le résultat
      callback(result.text)
      sendScannedDataToServer(result.text)
    }
    if (err && !(err instanceof NotFoundException)) {
      console.error(err)
      // Gérer les autres types d'erreurs comme vous le souhaitez
    }
  })
}

const stopScanner = () => {
  codeReader.reset()
}

export { startScanner, stopScanner }
