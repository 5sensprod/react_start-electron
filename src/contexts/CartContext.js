import React, { createContext, useState, useEffect } from 'react'
import {
  calculateTotal,
  calculateDiscountMarkup,
  calculateTax,
  calculateTotalItem,
  applyCartDiscountOrMarkup,
} from '../utils/priceUtils'

export const CartContext = createContext()

const taxRate = 0.2

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [onHoldInvoices, setOnHoldInvoices] = useState([])
  const [cartTotals, setCartTotals] = useState({
    totalHT: 0,
    totalTTC: 0,
    totalTaxes: 0,
    originalTotal: 0,
    modifiedTotal: 0,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  const enrichCartItem = (item) => {
    const priceToUse = item.prixModifie ?? item.prixVente
    const prixHT = priceToUse / (1 + taxRate)
    const montantTVA = calculateTax(prixHT, taxRate)
    const tauxTVA = taxRate * 100
    const totalItem = calculateTotalItem(item)

    return {
      ...item,
      prixHT: prixHT.toFixed(2),
      puTTC: priceToUse.toFixed(2),
      montantTVA: montantTVA.toFixed(2),
      tauxTVA,
      remiseMajorationLabel: calculateDiscountMarkup(
        item.prixVente,
        item.prixModifie,
      ).label,
      remiseMajorationValue: calculateDiscountMarkup(
        item.prixVente,
        item.prixModifie,
      ).value,
      totalItem,
    }
  }

  // Calculer les totaux HT, TTC et les taxes pour les articles du panier
  const calculateCartTotals = (items) => {
    const totalHT = calculateTotal(items, (item) => item.prixHT)
    const totalTTC = calculateTotal(
      items,
      (item) => item.prixModifie ?? item.prixVente,
    )
    const totalTaxes = totalTTC - totalHT

    return { totalHT, totalTTC, totalTaxes }
  }

  const updateTotalWithAdjustment = (adjustment) => {
    const newModifiedTotal = applyCartDiscountOrMarkup(
      cartTotals.originalTotal,
      adjustment,
    )
    // Mettez à jour les autres valeurs du panier si nécessaire
    setCartTotals({
      ...cartTotals,
      modifiedTotal: newModifiedTotal,
      // totalHT et totalTaxes peuvent également être recalculés ici
    })
  }

  // Mettez à jour les totaux chaque fois que le panier est modifié
  useEffect(() => {
    const newCartTotals = calculateCartTotals(cartItems)
    setCartTotals((prevTotals) => ({
      ...prevTotals,
      totalHT: newCartTotals.totalHT,
      totalTTC: newCartTotals.totalTTC,
      totalTaxes: newCartTotals.totalTaxes,
      originalTotal: newCartTotals.totalTTC,
      modifiedTotal: newCartTotals.totalTTC,
    }))
  }, [cartItems])

  // Mettre la facture en attente
  const holdInvoice = () => {
    const newInvoice = {
      id: Date.now(),
      items: cartItems.map((item) => ({
        ...item,
        prixModifie: item.prixModifie,
      })),
    }
    setOnHoldInvoices((prevInvoices) => [...prevInvoices, newInvoice])
    setCartItems([])
  }

  // Reprendre une facture en attente
  const resumeInvoice = (index) => {
    const invoiceItems = onHoldInvoices[index].items.map((item) => ({
      ...item,
      // Restaurez le prixModifie et le prixVente
      prixVente: item.prixVente,
      prixModifie: item.prixModifie,
    }))
    setCartItems(invoiceItems)
    // Optionnellement, vous pouvez décider de conserver ou non la facture dans onHoldInvoices
  }

  const deleteInvoice = (index) => {
    setOnHoldInvoices((prevInvoices) =>
      prevInvoices.filter((_, i) => i !== index),
    )
  }

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (item) => item._id === product._id,
      )

      if (itemIndex > -1) {
        // Le produit est déjà dans le panier, donc nous augmentons simplement la quantité.
        const newItems = [...currentItems]
        newItems[itemIndex] = enrichCartItem({
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + 1,
        })
        return newItems
      } else {
        // Le produit n'est pas dans le panier, nous l'ajoutons après l'avoir enrichi.
        const newItem = enrichCartItem({ ...product, quantity: 1 })
        return [...currentItems, newItem]
      }
    })
  }

  // Mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId ? enrichCartItem({ ...item, quantity }) : item,
      ),
    )
  }

  // Mettre à jour le prix d'un article dans le panier
  const updatePrice = (productId, newPrice) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId
          ? enrichCartItem({ ...item, prixModifie: newPrice })
          : item,
      ),
    )
  }

  // Retirer un produit du panier
  const removeItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        onHoldInvoices,
        addToCart,
        updateQuantity,
        removeItem,
        holdInvoice,
        resumeInvoice,
        deleteInvoice,
        updatePrice,
        cartTotals,
        updateTotalWithAdjustment,
        taxRate,
        isModalOpen,
        setIsModalOpen,
        invoiceData,
        setInvoiceData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
