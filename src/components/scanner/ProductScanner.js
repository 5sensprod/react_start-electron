import React, { useRef, useEffect } from 'react'
import { startScanner, stopScanner } from './BarcodeScanner'

const ProductScanner = ({ onScan }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        video.srcObject = stream
        startScanner(video, onScan)
      } catch (err) {
        console.error('Error starting video stream:', err)
      }
    }

    if (navigator.mediaDevices.getUserMedia) {
      startVideoStream()
    }

    return () => {
      stopScanner()
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onScan])

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%' }}
        autoPlay
        muted
        playsInline
      />
    </div>
  )
}

export default ProductScanner
