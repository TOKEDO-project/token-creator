import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import { saveTransaction, saveSetAuthorizedReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'
import prepareSetAuthorized from '../utils/prepareSetAuthorizedTransaction'
import StepHeader from './steps/parts/StepHeader'
import icon from '../assets/images/help.svg'

class MainTokenSaleAuthorize extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: false
    }
  }

  async componentDidMount () {
    const { web3, tokenId, tokens, mainTokenSales } = this.props
    const transactionHash = tokens.receipts[tokenId].transactionHash
    const tokenType = tokens.transactions[transactionHash].type
    const mainTokenSaleAddress = mainTokenSales[tokenId].receipt.contractAddress
    const transaction = await prepareSetAuthorized({ web3, tokenType, tokenAddress: tokenId, authorizedAddress: mainTokenSaleAddress })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, web3, tokenId } = this.props
    dispatch(setState({state: 'authorized', tokenAddress: tokenId}))
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId } = this.props
    dispatch(saveSetAuthorizedReceipt(tokenId, receipt))
  }

  render () {
    const { t } = this.props
    const {transaction, loading} = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <div>
        <WalletSelection connectorName='mainTokenSaleAuthorize' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
          <StepHeader
            icon={icon}
            title={t(`Authorize the creation of token sales`)}
          >
            {t(`This is the last transaction required. With this transaction you allow the contract of the Project to transfer the tokens.`)}
          </StepHeader>
          <div className='separator-twentyfive' />
        </WalletSelection>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleAuthorize))
