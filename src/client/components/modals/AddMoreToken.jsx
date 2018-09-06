import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import plus from '../../assets/images/plus.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import MainTokenSaleAddAmount from '../steps/MainTokenSaleAddAmount'

class AddMoreToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }
  prepareTransaction = async (amount) => {
    /* const { web3, tokens, tokenId, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareTransferTokenTransaction({web3, tokenType, tokenAddress: tokenId, mainTokenSaleAddress, tokenAmount: amount})
    this.setState({
      transaction,
      loading: false
    }) */
  }

  onTransactionHash = (transactionHash) => {
    /* const { dispatch, web3, tokenId } = this.props
    console.log('OTH:', web3.address, tokenId)
    dispatch(setState({ state: 'token-transferred', tokenAddress: tokenId }))
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId })) */
  }

  onReceipt = (receipt) => {
    /* const { dispatch, tokenId, addMainTokenSale: { amount } } = this.props
    dispatch(saveTransferReceipt(tokenId, receipt, amount)) */
  }
  changeAmount = (e) => {
    /* e.preventDefault()
    this.setState({
      transaction: null
    }) */
  }
  render () {
    const { t, tokenId } = this.props
    const { visible } = this.state
    return (
      <Modal icon={plus} visible={visible} title={t('Add More Tokens')} toggleVisibility={this.toggleVisibility}>
        <MainTokenSaleAddAmount onIsValidCB={this.prepareTransaction} tokenId={tokenId} />
        <div className='separator-twentyfive' />
        <WalletSelection />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(AddMoreToken)))
