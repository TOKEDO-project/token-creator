import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import transferToken from '../../assets/images/transfer-token.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import { saveSetTimeTokenSaleTransaction, saveSetTimeTokenSaleReceipt } from '../../redux/actions'
import { getTokenSalesTransactions, getTokenSaleTimes } from '../../utils/tokenSales'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import prepareSetTimeTransaction from '../../utils/prepareSetTimeTransaction'
import { pushStartDate } from '../../redux/tokenSales'

class ChangeStartEndTimeTokenSale extends React.Component {
  constructor (props) {
    super(props)

    const { tokenId, tokenSaleTransactionId, tokenSales, mainTokenSales } = props
    const tokenSaleTransactions = getTokenSalesTransactions({ tokenId, mainTokenSales, tokenSales })
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]

    const { startTime, endTime } = getTokenSaleTimes(tokenSale)

    this.state = {
      newStartTime: startTime,
      newEndTime: endTime,
      visible: true,
      transaction: null
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }

  onChangeStartTime = (date) => {
    this.setState({
      newStartTime: date.valueOf() + ''
    })
  }

  onChangeEndTime = (date) => {
    this.setState({
      newEndTime: date.valueOf() + ''
    })
  }

  onClickNext = (e) => {
    const { address, amount } = this.state
    e.preventDefault()
    this.prepareTransaction(address, amount)
  }

  prepareTransaction = async (e) => {
    const { web3, mainTokenSales, tokenId, tokenSaleTransactionId, tokenSales } = this.props
    const { newStartTime, newEndTime } = this.state
    e.preventDefault()
    const tokenSaleTransactions = getTokenSalesTransactions({ tokenId, mainTokenSales, tokenSales })
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]
    console.log('CHANGE DATES', tokenSale)
    const transaction = await prepareSetTimeTransaction({ web3, tokenSaleAddress: tokenSale.contractAddress, hasKYC: tokenSale.kyc, startTime: newStartTime, endTime: newEndTime })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, tokenSaleTransactionId, tokenSales, mainTokenSales } = this.props
    const { newStartTime, newEndTime } = this.state
    const tokenSaleTransactions = getTokenSalesTransactions({tokenId, mainTokenSales, tokenSales})
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]
    dispatch(saveSetTimeTokenSaleTransaction({ tokenSaleAddress: tokenSale.contractAddress, txId: transactionHash, startTime: newStartTime, endTime: newEndTime }))
  }

  onReceipt = (receipt) => {
    const { history, dispatch, tokenId, tokenSaleTransactionId, tokenSales, mainTokenSales } = this.props
    const { newStartTime, newEndTime } = this.state
    const tokenSaleTransactions = getTokenSalesTransactions({ tokenId, mainTokenSales, tokenSales })
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]
    const mainTokenSale = mainTokenSales[tokenId]
    const mainTokenSaleAddress = mainTokenSale && mainTokenSale.receipt ? mainTokenSale.receipt.contractAddress : null
    dispatch(pushStartDate({mainTokenSaleAddress, tokenSaleAddress: tokenSale.contractAddress, startTime: newStartTime, endTime: newEndTime}))
    dispatch(saveSetTimeTokenSaleReceipt({ tokenSaleAddress: tokenSale.contractAddress, receipt }))
    history.push(`/token/details/${tokenId}`)
  }

  changeDates = (e) => {
    e.preventDefault()
    this.setState({
      transaction: null
    })
  }

  render () {
    const { t, tokenId, tokenSaleTransactionId, tokenSales, mainTokenSales } = this.props
    const { visible, transaction, newStartTime, newEndTime } = this.state
    const tokenSaleTransactions = getTokenSalesTransactions({tokenId, mainTokenSales, tokenSales})
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]
    const { startTime, endTime } = getTokenSaleTimes(tokenSale)
    const differentStartTime = !moment(newStartTime, 'x').isSame(moment(startTime, 'x'), 'day')
    const differentEndTime = !moment(newEndTime, 'x').isSame(moment(endTime, 'x'), 'day')

    return (
      <Modal icon={transferToken} visible={visible} title={t('Transfer Tokens')} toggleVisibility={this.toggleVisibility}>
        {transaction
          ? <WalletSelection connectorName='changeDatesTokenSale' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
            <div className='top d-flex flex-row flex-h-start flex-v-center'>
              <div className='left'>
                <i className='far fa-question-circle' style={{ fontSize: '50px', color: 'grey' }} />
              </div>
              <div className='right d-flex flex-column flex-h-center'>
                <span className='title'>{t(`Change Dates`)}:</span>
                <span className='description font-size-tiny'>
                  {t(`You need to make the transaction to change the dates of the token sale.`)}
                </span>
                <p>
                  {t('New Start Date')}: {moment(newStartTime, 'x').format('DD/MM/YYYY')} - {t('New End Date')}: {moment(newEndTime, 'x').format('DD/MM/YYYY')}  <button onClick={this.changeDates}><i className='fas fa-undo-alt' /> Change the dates</button>
                </p>
              </div>
            </div>
          </WalletSelection>
          : <div>
            Current Start Time: {moment(startTime, 'x').format('DD/MM/YYYY')}
            <br />
            Start Time:
            <DatePicker
              selected={moment(newStartTime, 'x')}
              onChange={this.onChangeStartTime}
              dateFormat='DD/MM/YYYY'
            />
            Current End Time: {moment(endTime, 'x').format('DD/MM/YYYY')}
            <br />
            End Time:
            <DatePicker
              selected={moment(newEndTime, 'x')}
              onChange={this.onChangeEndTime}
              dateFormat='DD/MM/YYYY'
            />
            {differentStartTime || differentEndTime ? <button className='next shadow pure-u-7-24' onClick={this.prepareTransaction}>{t('Next')}</button> : null}
          </div>
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(ChangeStartEndTimeTokenSale)))
