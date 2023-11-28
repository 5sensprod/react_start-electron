import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { addInvoice } from '../api/invoiceService'
import { calculateInvoiceTotal } from '../utils/priceUtils'

const useHandlePayClick = (setInvoiceData) => {
  const { cartItems, setCartItems, setIsModalOpen } = useContext(CartContext)

  const handlePayClick = async (paymentType) => {
    const totalTTC = calculateInvoiceTotal(cartItems)
    const invoiceItems = cartItems.map((item) => ({
      reference: item.reference,
      quantite: item.quantity,
      puHT: item.prixHT,
      puTTC: item.puTTC,
      tauxTVA: item.tauxTVA,
      montantTVA: item.montantTVA,
      remiseMajorationLabel: item.remiseMajorationLabel,
      remiseMajorationValue: item.remiseMajorationValue,
    }))

    // Créez l'objet de facture à envoyer
    const invoiceData = {
      items: invoiceItems,
      totalTTC: totalTTC,
      date: new Date().toISOString(),
      paymentType,
      // ...autres informations pertinentes pour la facture
    }

    try {
      const newInvoice = await addInvoice(invoiceData)
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
