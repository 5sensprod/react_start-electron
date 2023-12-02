import { useEffect, useRef, useCallback, useState } from 'react'

const useWebSocket = (url, onMessage, onError, onOpen, onClose) => {
  const ws = useRef(null)
  const [shouldConnect, setShouldConnect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const timeoutRef = useRef(null)

  const clearReconnectionTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const checkServerStatus = useCallback(async () => {
    clearReconnectionTimeout()
    try {
      const response = await fetch(`${url.replace('ws', 'http')}/status`)
      const data = await response.json()
      if (data.status === 'ok') {
        setShouldConnect(true)
        setAttempts(0) // Reset attempts after successful connection
      } else {
        // Increment attempts and use exponential backoff for reconnection attempts
        setAttempts((prevAttempts) => prevAttempts + 1)
        const delay = Math.min(1000 * 2 ** attempts, 30000) // Cap the delay to 30 seconds
        timeoutRef.current = setTimeout(checkServerStatus, delay)
      }
    } catch (error) {
      console.error('Error checking server status:', error)
      setAttempts((prevAttempts) => prevAttempts + 1)
      const delay = Math.min(1000 * 2 ** attempts, 30000) // Cap the delay to 30 seconds
      timeoutRef.current = setTimeout(checkServerStatus, delay)
    }
  }, [url, attempts, clearReconnectionTimeout])

  useEffect(() => {
    // Fermer la connexion WebSocket existante si l'URL change
    if (ws.current) {
      console.log('URL has changed, closing the current WebSocket connection')
      ws.current.close()
    }

    // Réinitialiser l'état pour la nouvelle connexion
    setShouldConnect(false)
    setAttempts(0)
    clearReconnectionTimeout()

    // Initialiser une nouvelle vérification de l'état du serveur
    const initialDelay = 3000 // Start with a 3-second delay to check server status
    timeoutRef.current = setTimeout(checkServerStatus, initialDelay)

    return () => {
      clearReconnectionTimeout()
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [url, checkServerStatus, clearReconnectionTimeout]) // Ajouter url comme dépendance pour réagir aux changements d'URL

  useEffect(() => {
    if (shouldConnect) {
      console.log('Attempting to connect to WebSocket', url)

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
        setShouldConnect(false)
        checkServerStatus()
      }
    }

    return () => {
      if (ws.current) {
        console.log('Closing WebSocket connection')
        ws.current.close()
      }
      clearReconnectionTimeout()
    }
  }, [
    shouldConnect,
    url,
    onMessage,
    onError,
    onOpen,
    onClose,
    checkServerStatus,
    clearReconnectionTimeout,
  ])

  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('Sending message through WebSocket:', message)
      ws.current.send(message)
    } else {
      console.error('Cannot send message, WebSocket is not open')
    }
  }, [])

  return { sendMessage, checkServerStatus }
}

export default useWebSocket
