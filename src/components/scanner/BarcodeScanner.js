// src/scanner/BarcodeScanner.js

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

const codeReader = new BrowserMultiFormatReader()

const startScanner = (videoElem, callback) => {
  codeReader.decodeFromVideoDevice(null, videoElem, (result, err) => {
    if (result) {
      // Appeler le callback avec le résultat
      callback(result.text)
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
