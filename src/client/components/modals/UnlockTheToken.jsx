import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import unlock from '../../assets/images/unlock.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import { WarningMessage } from '../WarningMessage'
import prepareUnlockTokenTransaction from '../../utils/prepareUnlockTokenTransaction'

class UnlockTheToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true,
      transaction: null
    }
  }

  async componentWillMount () {
    const { web3, tokenId, tokens } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const transaction = await prepareUnlockTokenTransaction({ web3, tokenAddress: tokenId, tokenType })
    this.setState({
      transaction
    })
  }

  onTransactionHash = (transactionHash) => {
    /* const { dispatch, web3, tokenId } = this.props
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId })) */
  }

  onReceipt = (receipt) => {
    /* const { dispatch, tokenId, addMainTokenSale: { amount } } = this.props
    dispatch(saveTransferReceipt(tokenId, receipt, amount)) */
  }

  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }
  render () {
    const { t } = this.props
    const { visible, transaction } = this.state
    return (
      <Modal icon={unlock} visible={visible} title={t('Unlock The Token')} toggleVisibility={this.toggleVisibility}>
        <WarningMessage title={t('WARNING: This action can not be undone')} description={t('When you unlock your Token any one will be able to transfer it.')} backgroundColor='#D93D3D' icon='exclamation-triangle' shadow />
        <div className='separator-twentyfive' />
        <WalletSelection connectorName='UnlockToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(UnlockTheToken)))
