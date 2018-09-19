import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import axios from 'axios'
import qs from 'qs'
import Modal from '../Modal'
import { setTosAccepted } from '../../redux/addTokenSale'
import KYC from '../../assets/images/lock-KYC.svg'
import './KycYesNo.css'

class KycYes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true,
      checked: false,
      name: '',
      email2: '',
      message: '',
      status: ''
    }
  }

  onClick = (e) => {
    const { dispatch, tokenId, toggleVisibility } = this.props
    const { checked, status } = this.state
    e.preventDefault()
    if (checked && status === 'success') {
      dispatch(setTosAccepted({ tokenAddress: tokenId, tosAccepted: true }))
      toggleVisibility(e, true)
    }
  }

  onClickForm = async (e) => {
    const { email2, name, message } = this.state
    e.preventDefault()
    if (email2 !== '' && name !== '' && message !== '') {
      this.setState({
        status: ''
      })
      try {
        await axios.post('https://atomax.io/email/', qs.stringify({
          email: email2,
          name,
          msg: message
        }))
        this.setState({
          status: 'success'
        })
      } catch (e) {
        this.setState({
          status: 'error'
        })
      }
    } else {
      this.setState({
        status: 'missing'
      })
    }
  }

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked })
  }

  onChangeText = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({
      [name]: value
    })
  }

  render () {
    const { t, toggleVisibility, addTokenSale, tokenId } = this.props
    const { visible, checked, email2, name, message, status } = this.state
    const { tosAccepted } = addTokenSale[tokenId]
    return (
      <Modal title={t('With KYC')} icon={KYC} visible={visible} toggleVisibility={toggleVisibility}>
        <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
          <p>{t('this is our kyc')}</p>
        </div>
        {!tosAccepted
          ? <form className='kycModal bottom d-flex flex-row flex-h-between' onSubmit={this.onClickForm}>
            <div className='input-box pure-u-1 d-flex flex-column flex-v-center'>
              <input type='text' name='email' hidden /> <br />
              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <label>{t('Email')}</label>
                <input className='token-name text shadow pure-u-2' type='text' name='email2' value={email2} onChange={this.onChangeText} />
              </div>

              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <label>{t('Name')}</label>
                <input className='token-name text shadow pure-u-2' type='text' name='name' value={name} onChange={this.onChangeText} />
              </div>
              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <label>{t('Message')}</label>
                <input className='token-name text shadow pure-u-2' type='text' name='message' value={message} onChange={this.onChangeText} />
              </div>
              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <button className='nextBtn shadow pure-u-1' onClick={this.onClickForm}>{t('Send Form')}</button>
              </div>

              <div className='pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <p className='formMsg'>
                  {status === 'success' ? t('Email sent') : null}
                  {status === 'error' ? t('Error') : null}
                  {status === 'missing' ? t('Missing parameters') : null}
                </p>
              </div>
              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <input className='' type='checkbox' checked={checked} onChange={this.toggleCheckbox} value='terms' />{t('Accept all')}<br />
              </div>
              <div className='marginTop pure-u-1 pure-u-sm-1 pure-u-md-1-2 pure-u-lg-1-2 pure-u-xl-1-3'>
                <button className='nextBtn  shadow pure-u-1' disabled={!checked || status !== 'success'} onClick={this.onClick}>{t('OK')}</button>
              </div>
            </div>
          </form>
          : null
        }
      </Modal>
    )
  }
}

export default translate('translations')(connect(s => s)(KycYes))
