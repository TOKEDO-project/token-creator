import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import transferToken from '../../assets/images/transfer-token.svg'
import Modal from '../Modal'
import EthereumAddress from '../steps/EthereumAddress'
import TransferTokenAmount from '../steps/TransferTokenAmount'
import WalletSelection from '../steps/WalletSelection'
import prepareWithdrawTransaction from '../../utils/prepareWithdrawTransaction'
import { saveTransferTokenTransaction, saveTransferTokenReceipt } from '../../redux/actions'
import bnUtils from '../../../../bnUtils'
import { setAmount } from '../../redux/addMainTokenSale'
import { StepHeader } from '../steps/parts/StepHeader'
import icon from '../../assets/images/help.svg'
import { getTokenInfo } from '../../utils/tokens'

class TransferTokens extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      address: '',
      validAddress: false,
      amount: '',
      validAmount: false,
      visible: true,
      transaction: null
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }

  onChangeAddress = (address) => {
    console.log('Transfer Token address', address)
    this.setState({
      address
    })
  }

  onValidAddress = (validAddress) => {
    console.log('Transfer Token valid address', validAddress)
    this.setState({
      validAddress
    })
  }

  onChangeAmount = (amount) => {
    console.log('Transfer Token amount', amount)
    this.setState({
      amount
    })
  }

  onValidAmount = (validAmount) => {
    console.log('Transfer Token valid amount', validAmount)
    this.setState({
      validAmount
    })
  }

  onClickNext = (e) => {
    const { address, amount } = this.state
    e.preventDefault()
    this.prepareTransaction(address, amount)
  }

  prepareTransaction = async (address, amount) => {
    const { web3, mainTokenSales, tokenId, tokens } = this.props
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const token = getTokenInfo(tokenId, tokens)
    const transaction = await prepareWithdrawTransaction({ web3, mainTokenSaleAddress, to: address, amount, decimals: token.decimals })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, mainTokenSales } = this.props
    const { amount, address } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransferTokenTransaction({ mainTokenSaleAddress, txId: transactionHash, to: address, amount }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId, mainTokenSales, addMainTokenSale, history } = this.props
    const { amount } = this.state
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    dispatch(saveTransferTokenReceipt({ mainTokenSaleAddress, receipt }))
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
    const { visible, transaction, address, amount, validAddress, validAmount } = this.state
    console.log('ADDR', address, amount)
    return (
      <Modal icon={transferToken} visible={visible} title={t('Transfer Tokens')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection connectorName='mainTokenSaletransferToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <StepHeader
              icon={icon}
              title={t(`Transfer Token`)}
            >
              {t(`You need to make the transaction to transfer the tokens.`)}
              <p>
                {t('You are sending')}: {amount} {t('to')}: {address}  <button onClick={this.changeAmount}><i className='fas fa-undo-alt' /> Change the data</button>
              </p>
            </StepHeader>
          </WalletSelection>
          : <div>
            <EthereumAddress onChangeAddress={this.onChangeAddress} onValidAddress={this.onValidAddress} tokenId={tokenId} hideNextButton />
            <div className='separator-twentyfive' />
            <TransferTokenAmount onChangeAmount={this.onChangeAmount} onValidAmount={this.onValidAmount} tokenId={tokenId} hideNextButton />
            <div className='pure-u-1 d-flex flex-v-center'>
              {validAddress && validAmount ? <button className='nextBtn next shadow pure-u-7-24' onClick={this.onClickNext}>{t('Next')}</button> : null}
            </div>
          </div>
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(TransferTokens)))
