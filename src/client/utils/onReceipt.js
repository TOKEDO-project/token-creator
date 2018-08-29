import prepareTokenReceipt from './prepareTokenReceipt'
import { saveReceipt } from '../redux/tokens'

export const onReceiptToken = (dispatch, receipt) => {
  console.log('ON_RECEIPT_TOKEN:', receipt)
  const receiptPrepared = prepareTokenReceipt(receipt)
  console.log('ON_RECEIPT_TOKEN:', receiptPrepared)
  const contractAddress = receiptPrepared.contractAddress

  // write Receipt to store
  dispatch(saveReceipt(contractAddress, { ...receiptPrepared }))
  // this.props.getContractAddress(contractAddress)
}
