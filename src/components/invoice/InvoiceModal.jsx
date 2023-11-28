import React, { useContext } from 'react'
import { Modal, Paper, Typography, Button } from '@mui/material'
import { CartContext } from '../../contexts/CartContext'
import InvoicePrintComponent from './InvoicePrintComponent'
import usePrintInvoice from '../../hooks/usePrintInvoice'

const InvoiceModal = () => {
  const { isModalOpen, setIsModalOpen, invoiceData } = useContext(CartContext)
  const { printRef, handlePrint } = usePrintInvoice()

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          La facture a été enregistrée avec succès.
        </Typography>
        {invoiceData && (
          <InvoicePrintComponent ref={printRef} invoiceData={invoiceData} />
        )}
        <Button onClick={handlePrint} variant="contained">
          Imprimer la facture
        </Button>
      </Paper>
    </Modal>
  )
}

export default InvoiceModal
