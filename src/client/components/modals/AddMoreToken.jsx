import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import plus from '../../assets/images/plus.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import MainTokenSaleAddAmount from '../steps/MainTokenSaleAddAmount'
import prepareTransferTokenTransaction from '../../utils/prepareTransferTokenTransaction'
import { saveAddMoreTokenTransaction, saveAddMoreTokenReceipt } from '../../redux/actions'
import { setAmount } from '../../redux/addMainTokenSale'
import bnUtils from '../../../../bnUtils'
import { StepHeader } from '../steps/parts/StepHeader'
import icon from '../../assets/images/help.svg'
import { getTokenInfo } from '../../utils/tokens'

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
    const token = getTokenInfo(tokenId, tokens)
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareTransferTokenTransaction({web3, tokenType: token.type, tokenAddress: tokenId, to: mainTokenSaleAddress, tokenAmount: amount, tokenDecimals: token.decimals})
    this.setState({
      amount,
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, mainTokenSales } = this.props
    const { amount } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveAddMoreTokenTransaction({mainTokenSaleAddress, txId: transactionHash, amount}))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales, addMainTokenSale, history } = this.props
    const { amount } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveAddMoreTokenReceipt({ mainTokenSaleAddress, receipt }))
    dispatch(setAmount({tokenAddress: tokenId, amount: bnUtils.plus(addMainTokenSale[tokenId].amount, amount)}))
    history.push(`/token/details/${tokenId}`)
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
          ? <WalletSelection connectorName='addMoreToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} tokenId={tokenId}>
            <StepHeader
              icon={icon}
              title={t(`Add More Token to Sale`)}
            >
              {t(`You need to make the transaction to add more tokens to sale.`)}

            </StepHeader>
            <div className='groupBottom pure-u-1 d-flex flex-v-center'>
              <div className='pure-u-1 pure-u-sm-1 pure-u-md-2-3 pure-u-lg-3-5 pure-u-xl-3-5'>
                <p>
                  <span className='font-weight-bold'>{t('You are adding')}: </span>
                  {amount} {t('tokens for sale')}
                </p>
              </div>

              <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-2-5 pure-u-xl-2-5'>
                <button className='btnChange' onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
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
