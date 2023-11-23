import { useEffect, useRef, useCallback } from 'react'

const useWebSocket = (url, onMessage, onError, onOpen, onClose) => {
  const ws = useRef(null)

  useEffect(() => {
    // Vérifiez si le WebSocket est déjà ouvert
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(url)

      ws.current.onmessage = onMessage
      ws.current.onerror = onError
      ws.current.onopen = onOpen
      ws.current.onclose = onClose
    }

    // La fonction de nettoyage
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [url, onMessage, onError, onOpen, onClose])

  // Enveloppez sendMessage dans useCallback pour éviter une nouvelle création à chaque re-rendu
  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message)
    }
  }, [])

  return sendMessage
}

export default useWebSocket
