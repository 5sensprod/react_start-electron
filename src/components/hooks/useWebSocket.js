import { useEffect, useRef, useCallback } from 'react'

const useWebSocket = (url, onMessage, onError, onOpen, onClose) => {
  const ws = useRef(null)

  useEffect(() => {
    console.log('Attempting to connect to WebSocket', url)

    // Vérifiez si le WebSocket est déjà ouvert
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      console.log('Creating new WebSocket instance')
      ws.current = new WebSocket(url)

      ws.current.onmessage = (event) => {
        console.log('WebSocket message received:', event.data)
        onMessage(event)
      }
      ws.current.onerror = (error) => {
        console.error('WebSocket encountered an error:', error)
        onError(error)
      }
      ws.current.onopen = () => {
        console.log('WebSocket connection successfully opened')
        onOpen()
      }
      ws.current.onclose = (event) => {
        console.log('WebSocket connection closed:', event)
        onClose(event)
      }
    }

    // La fonction de nettoyage
    return () => {
      if (ws.current) {
        console.log('Closing WebSocket connection')
        ws.current.close()
      }
    }
  }, [url, onMessage, onError, onOpen, onClose])

  // Enveloppez sendMessage dans useCallback pour éviter une nouvelle création à chaque re-rendu
  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('Sending message through WebSocket:', message)
      ws.current.send(message)
    } else {
      console.log('Cannot send message, WebSocket is not open')
    }
  }, [])

  return sendMessage
}

export default useWebSocket
