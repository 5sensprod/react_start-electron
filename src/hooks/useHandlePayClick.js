// useHandlePayClick.js
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { addInvoice } from '../api/invoiceService'
import { calculateInvoiceTotal } from '../utils/priceUtils'

const useHandlePayClick = () => {
  const { cartItems, setCartItems, setIsModalOpen, setInvoiceData } =
    useContext(CartContext)

  const handlePayClick = async (paymentType) => {
    // Créez l'objet de facture à partir des articles du panier
    const invoiceItems = cartItems.map((item) => ({
      reference: item.reference,
      quantite: item.quantity,
      puHT: item.prixHT,
      puTTC: item.puTTC,
      totalItem: item.totalItem,
      tauxTVA: item.tauxTVA,
      montantTVA: item.montantTVA,
      remiseMajorationLabel: item.remiseMajorationLabel,
      remiseMajorationValue: item.remiseMajorationValue,
    }))

    const totalTTC = calculateInvoiceTotal(cartItems)

    // Créez un nouvel objet de données de facture pour l'envoyer
    const newInvoiceData = {
      items: invoiceItems,
      totalTTC: totalTTC,
      date: new Date().toISOString(),
      paymentType,
    }

    try {
      // Envoyez les données de la facture à l'API et mettez à jour l'état
      const newInvoice = await addInvoice(newInvoiceData)
      console.log('New invoice added:', newInvoice)
      setInvoiceData(newInvoice)
      setCartItems([])
      setIsModalOpen(true)
    } catch (error) {
      console.error('An error occurred while adding the invoice:', error)
    }
  }

  return handlePayClick
}

export default useHandlePayClick
