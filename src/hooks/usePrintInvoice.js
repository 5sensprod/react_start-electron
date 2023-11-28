// src/hooks/PrintInvoice.js
import { useRef } from 'react'

const usePrintInvoice = () => {
  const printRef = useRef()

  const handlePrint = () => {
    const printContent = printRef.current
    if (printContent) {
      const windowPrint = window.open(
        '',
        '',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0',
      )
      windowPrint.document.write(printContent.innerHTML)
      windowPrint.document.close()
      windowPrint.focus()
      windowPrint.print()
      windowPrint.close()
    }
  }

  return { printRef, handlePrint }
}

export default usePrintInvoice
