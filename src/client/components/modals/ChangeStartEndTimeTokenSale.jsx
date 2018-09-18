import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import saleDate from '../../assets/images/token-sale-date.svg'
import calendar from '../../assets/images/calendarInput.svg'
import changeSettings from '../../assets/images/Change_Settings.svg'
import Modal from '../Modal'
import WalletSelection from '../steps/WalletSelection'
import { saveSetTimeTokenSaleTransaction, saveSetTimeTokenSaleReceipt } from '../../redux/actions'
import { getTokenSalesTransactions, getTokenSaleTimes } from '../../utils/tokenSales'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../steps/Step.css'
import '../steps/StepDateField.css'
import '../MainTokenSaleAddToken.css'
import prepareSetTimeTransaction from '../../utils/prepareSetTimeTransaction'
import { pushStartDate } from '../../redux/tokenSales'
import DateInput from '../DateInput'

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
    const transaction = await prepareSetTimeTransaction({ web3, tokenSaleAddress: tokenSale.contractAddress, hasKYC: tokenSale.kyc, startTime: newStartTime, endTime: newEndTime })
    this.setState({
      transaction,
      loading: false
    })
  }

  onTransactionHash = (transactionHash) => {
    const { dispatch, tokenId, tokenSaleTransactionId, tokenSales, mainTokenSales } = this.props
    const { newStartTime, newEndTime } = this.state
    const tokenSaleTransactions = getTokenSalesTransactions({ tokenId, mainTokenSales, tokenSales })
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
    dispatch(pushStartDate({ mainTokenSaleAddress, tokenSaleAddress: tokenSale.contractAddress, startTime: newStartTime, endTime: newEndTime }))
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
    const tokenSaleTransactions = getTokenSalesTransactions({ tokenId, mainTokenSales, tokenSales })
    const tokenSale = tokenSaleTransactions[tokenSaleTransactionId]
    const { startTime, endTime } = getTokenSaleTimes(tokenSale)
    const differentStartTime = !moment(newStartTime, 'x').isSame(moment(startTime, 'x'), 'day')
    const differentEndTime = !moment(newEndTime, 'x').isSame(moment(endTime, 'x'), 'day')

    return (
      <Modal icon={saleDate} visible={visible} title={t('Change Time Settings')} toggleVisibility={this.toggleVisibility}>

        {transaction
          ? <div>
            <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-2-5 pure-u-xl-2-5 '>
              <button className='goBackBtn' onClick={this.changeDates}><span className=''>{`< `} {t('Go back and redefine the dates')}</span></button>
            </div>
            <WalletSelection connectorName='changeDatesTokenSale' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt}>
              <div className='top d-flex flex-row flex-h-start'>

                <div className='left'>
                  <img src={changeSettings} />
                </div>
                <div className='right'>
                  <span className='title'>{t(`New Settings`)}:</span>

                </div>
              </div>
              <div className='groupBottom pure-u-1 d-flex flex-v-center'>
                <div className='pure-u-1'>
                  <p>
                    <span className='font-weight-bold'>{t('Start Time')} : </span>
                    {moment(newStartTime, 'x').format('YYYY-MM-DD HH:mm')} (UTC {moment(newStartTime, 'x').format('Z')})
                  </p>
                  <p>
                    <span className='font-weight-bold'> {t('End Time')} : </span>
                    {moment(newEndTime, 'x').format('YYYY-MM-DD HH:mm')} (UTC {moment(newEndTime, 'x').format('Z')})
                  </p>
                  <p className='marginTop'>
                    <span className='font-weight-bold'> {t(`Send the transaction to confirm the new settings.`)}</span>
                  </p>
                </div>
              </div>

            </WalletSelection>
          </div>
          : <div className='modifyDate d-flex flex-column flex-v-center'>
            <form className='date-pickers pure-u-1'>

              <div className='date-picker pure-u-1 d-flex flex-v-center flex-h-between'>
                <div className='pure-u-1 pure-u-sm-10-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24'>
                  <span className='date-picker-title'>{t('Current Start Time')}</span>
                  <div className='inputBox d-flex flex-v-center'>{moment(startTime, 'x').format('YYYY-MM-DD HH:mm')} (UTC {moment(startTime, 'x').format('Z')})</div>

                </div>

                <div className='pure-u-1 pure-u-sm-10-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24'>
                  <span className='date-picker-title'>{t('New Start Time')}</span>
                  <div className='dateWrap'>
                    <img src={calendar} />
                    <DatePicker
                      customInput={<DateInput />}
                      selected={moment(newStartTime, 'x')}
                      minDate={moment()}
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={1}
                      dateFormat='LLL'
                      timeCaption='time'
                      onChange={this.onChangeStartTime}
                    />
                  </div>

                </div>
              </div>
              <div className='date-picker pure-u-1 d-flex flex-v-center  flex-h-between'>
                <div className='pure-u-1 pure-u-sm-10-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24'>
                  <span className='date-picker-title'>{t('Current End Time')}</span>
                  <div className='inputBox d-flex flex-v-center'>{moment(endTime, 'x').format('YYYY-MM-DD HH:mm')} (UTC {moment(endTime, 'x').format('Z')})</div>

                </div>

                <div className='pure-u-1 pure-u-sm-10-24 pure-u-md-10-24 pure-u-lg-10-24 pure-u-xl-10-24'>
                  <span className='date-picker-title'>{t('New End Time')}</span>
                  <div className='dateWrap'>
                    <img src={calendar} />
                    <DatePicker
                      customInput={<DateInput />}
                      selected={moment(newEndTime, 'x')}
                      minDate={moment()}
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={1}
                      dateFormat='LLL'
                      timeCaption='time'
                      onChange={this.onChangeEndTime}
                    />
                  </div>

                </div>
              </div>
              <div className='pure-u-1 flex-d flex-h-end '>
                {differentStartTime || differentEndTime ? <button className='nextBtn shadow floatRight' onClick={this.prepareTransaction}>{t('Next')}</button> : null}

              </div>

            </form>
          </div>
        }
        <div className='separator-twentyfive' />

      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(ChangeStartEndTimeTokenSale)))
