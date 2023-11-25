import React, { createContext, useState } from 'react'

// Création du Contexte qui sera utilisé pour fournir et consommer les données du panier
export const CartContext = createContext()

// Composant Provider qui enveloppera votre application ou une partie de celle-ci
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [onHoldInvoices, setOnHoldInvoices] = useState([])

  // Mettre la facture en attente
  const holdInvoice = () => {
    setOnHoldInvoices([...onHoldInvoices, cartItems])
    setCartItems([]) // Vider le panier actuel
  }

  // Reprendre une facture en attente
  const resumeInvoice = (index) => {
    // Si le panier actuel contient des éléments, demandez confirmation avant de le remplacer
    if (
      cartItems.length > 0 &&
      !window.confirm(
        'Cette facture en attente va être chargée et le panier actuel sera vidé. Êtes-vous sûr?',
      )
    ) {
      return
    }

    // Chargez la facture en attente sélectionnée
    setCartItems(onHoldInvoices[index])

    // Ne supprimez pas la facture de la liste des factures en attente
    // car elle doit rester persistante jusqu'à être payée ou supprimée explicitement
  }
  // Supprimer une facture en attente
  const deleteInvoice = (index) => {
    setOnHoldInvoices((currentInvoices) =>
      currentInvoices.filter((_, i) => i !== index),
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

  // Retirer un produit du panier
  const removeItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId),
    )
  }

  const checkout = () => {
    // Implémentez ici la logique de paiement ou de commande
    console.log('Procéder au paiement avec les articles du panier:', cartItems)
    // Après le paiement, vous pouvez vider le panier
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
