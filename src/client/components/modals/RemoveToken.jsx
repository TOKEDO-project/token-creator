import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import minus from '../../assets/images/minus.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import TokenSaleRemoveAmount from '../steps/TokenSaleRemoveAmount'
import prepareWithdrawTransaction from '../../utils/prepareWithdrawTransaction'
import { saveRemoveTokenTransaction, saveRemoveTokenReceipt } from '../../redux/actions'
import bnUtils from '../../../../bnUtils'
import { setAmount } from '../../redux/addMainTokenSale'
import { StepHeader } from '../steps/parts/StepHeader'
import icon from '../../assets/images/help.svg'

class RemoveToken extends React.Component {
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
    const { web3, mainTokenSales, tokenId } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareWithdrawTransaction({ web3, mainTokenSaleAddress, to: web3.address, amount })
    this.setState({
      amount,
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, mainTokenSales, web3 } = this.props
    const { amount } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveRemoveTokenTransaction({ mainTokenSaleAddress, txId: transactionHash, to: web3.address, amount }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales, addMainTokenSale, history } = this.props
    const { amount } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveRemoveTokenReceipt({ mainTokenSaleAddress, receipt }))
    dispatch(setAmount({ tokenAddress: tokenId, amount: bnUtils.minus(addMainTokenSale[tokenId].amount, amount) }))
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
      <Modal icon={minus} visible={visible} title={t('Remove Token')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection connectorName='mainTokenSaleRemoveToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <StepHeader
              icon={icon}
              title={t(`Remove Token to Sale`)}
            >
              {t(`You need to make the transaction to an ethereum address to remove tokens to sale.`)}
              <p>
                {t('You are removing')}: {amount} {t('tokens from sale')} <button onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the amount</button>
              </p>
            </StepHeader>
          </WalletSelection>
          : <TokenSaleRemoveAmount onIsValidCB={this.prepareTransaction} tokenId={tokenId} />
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(RemoveToken)))
