import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import plus from '../../assets/images/plus.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import MainTokenSaleAddAmount from '../steps/MainTokenSaleAddAmount'
import prepareTransferTokenTransaction from '../../utils/prepareTransferTokenTransaction'

class AddMoreToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      amount: null,
      visible: true,
      transaction: null
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }
  prepareTransaction = async (amount) => {
    const { web3, tokens, tokenId, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    console.log('---------prepareTransaction', tokenType, tokenId, mainTokenSaleAddress, amount)
    const transaction = await prepareTransferTokenTransaction({web3, tokenType, tokenAddress: tokenId, mainTokenSaleAddress, tokenAmount: amount})
    this.setState({
      amount: amount,
      transaction,
      loading: false
    })
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
    e.preventDefault()
    this.setState({
      transaction: null
    })
  }
  render () {
    const { t, tokenId } = this.props
    const { visible, transaction, amount } = this.state
    return (
      <Modal icon={plus} visible={visible} title={t('Add More Tokens')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection>
            <div className='top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Add More Token to Sale`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`You need to make the transaction to add more tokens to sale.`)}
                </span>
                <p>
                  {t('You are adding')}: {amount} {t('tokens for sale')} <button onClick={this.changeAmount}><i class='fas fa-undo-alt' /> Change the amount</button>
                </p>
              </div>
            </div>
          </WalletSelection>
          : <MainTokenSaleAddAmount onIsValidCB={this.prepareTransaction} tokenId={tokenId} />
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(AddMoreToken)))
