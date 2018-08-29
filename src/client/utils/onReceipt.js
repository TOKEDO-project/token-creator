import prepareTokenReceipt from './prepareTokenReceipt'
import { saveReceipt } from '../redux/tokens'

export const onReceiptToken = (dispatch, receipt) => {
  const receiptPrepared = prepareTokenReceipt(receipt)
  const contractAddress = receiptPrepared.contractAddress

  // write Receipt to store
  dispatch(saveReceipt(contractAddress, { ...receiptPrepared }))
}
