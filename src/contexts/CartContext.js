import React, { createContext, useState } from 'react'

// Création du Contexte qui sera utilisé pour fournir et consommer les données du panier
export const CartContext = createContext()

// Composant Provider qui enveloppera votre application ou une partie de celle-ci
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [onHoldInvoices, setOnHoldInvoices] = useState([])

  // Mettre la facture en attente
  const holdInvoice = () => {
    const newInvoice = {
      id: Date.now(), // Utiliser Date.now() génère un identifiant basé sur le temps actuel
      items: cartItems, // Les éléments actuels du panier
    }
    setOnHoldInvoices((prevInvoices) => [...prevInvoices, newInvoice])
    setCartItems([]) // Vider le panier actuel
  }

  // Reprendre une facture en attente
  const resumeInvoice = (index) => {
    const invoiceItems = onHoldInvoices[index].items
    setCartItems(invoiceItems)
    // Notez que nous ne supprimons pas la facture de onHoldInvoices ici
  }

  const deleteInvoice = (index) => {
    setOnHoldInvoices((prevInvoices) =>
      prevInvoices.filter((_, i) => i !== index),
    )
  }

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      // Vérifier si le produit est déjà dans le panier
      const itemIndex = currentItems.findIndex(
        (item) => item._id === product._id,
      )
      if (itemIndex > -1) {
        // Mettre à jour la quantité si le produit existe déjà
        const newItems = [...currentItems]
        newItems[itemIndex].quantity += 1
        return newItems
      } else {
        // Ajouter le nouveau produit avec une quantité initiale de 1
        return [...currentItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId ? { ...item, quantity: quantity } : item,
      ),
    )
  }

  // Mettre à jour le prix d'un article dans le panier
  const updatePrice = (productId, newPrice) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId ? { ...item, prixVente: newPrice } : item,
      ),
    )
  }

  // Retirer un produit du panier
  const removeItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId),
    )
  }

  const checkout = () => {
    console.log('Procéder au paiement avec les articles du panier:', cartItems)
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        onHoldInvoices,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
        holdInvoice,
        resumeInvoice,
        deleteInvoice,
        updatePrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
