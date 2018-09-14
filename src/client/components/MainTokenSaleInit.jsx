import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Loading from './Loading'
import WalletSelection from './steps/WalletSelection'
import prepareCreateMainTokenSaleTransaction from '../utils/prepareCreateMainTokenSaleTransaction'
import { saveTransaction, saveReceipt } from '../redux/mainTokenSales'
import { setState } from '../redux/addMainTokenSale'
import { StepHeader } from './steps/parts/StepHeader'
import icon from '../assets/images/help.svg'

class MainTokenSaleInit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transaction: null,
      loading: true
    }
  }

  async componentDidMount () {
    const { web3, tokenId } = this.props
    const transaction = await prepareCreateMainTokenSaleTransaction({ web3, addMainTokenSale: { userAddress: web3.address, tokenAddress: tokenId } })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, web3, tokenId } = this.props
    console.log('OTH:', web3.address, tokenId)
    dispatch(saveTransaction(tokenId, transactionHash, { userAddress: web3.address, tokenAddress: tokenId }))
  }

  onReceipt = (receipt) => {
    const { dispatch, tokenId } = this.props
    dispatch(setState({ state: 'deployed', tokenAddress: tokenId }))
    dispatch(saveReceipt(tokenId, receipt))
  }

  render () {
    const { t } = this.props
    const { transaction, loading } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <WalletSelection connectorName='mainTokenSaleDeploy' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
        <StepHeader
          icon={icon}
          title={t(`Create Your Project`)}
        >
          {t('In order to launch your token sale, first you need to create a Project. It’s a quick preliminary action that only requires you to complete some transactions.')}<br />
          {t(`This first transaction will deploy the smart contract of the Project.`)}
        </StepHeader>
        <div className='separator-twentyfive' />
      </WalletSelection>
    )
  }
}

export default translate('translations')(connect(s => s)(MainTokenSaleInit))
