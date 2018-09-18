import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import axios from 'axios'
import qs from 'qs'
import Modal from '../Modal'
import { setTosAccepted } from '../../redux/addTokenSale'

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
      toggleVisibility(true)
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
      <Modal title={t('With KYC')} visible={visible} toggleVisibility={toggleVisibility}>
        <div className='pure-u-1'>
          {t('this is our kyc')}
        </div>
        {!tosAccepted
          ? <form className='bottom d-flex flex-row flex-h-between' onSubmit={this.onClickForm}>
            <div className='input-box pure-u-1 d-flex flex-column flex-v-center'>
              <input type='text' name='email' hidden /> <br />
              <label>{t('Email')}</label>
              <input className='token-name text shadow pure-u-2' type='text' name='email2' value={email2} onChange={this.onChangeText} /> <br />
              <label>{t('Name')}</label>
              <input className='token-name text shadow pure-u-2' type='text' name='name' value={name} onChange={this.onChangeText} /><br />
              <label>{t('Message')}</label>
              <input className='token-name text shadow pure-u-2' type='text' name='message' value={message} onChange={this.onChangeText} /><br />
              <button className='nextBtn next shadow pure-u-7-24' onClick={this.onClickForm}>{t('Send Form')}</button>
              <div className='pure-u-1'>
                {status === 'success' ? t('Email sent') : null}
                {status === 'error' ? t('Error') : null}
                {status === 'missing' ? t('Missing parameters') : null}
              </div>
              <input type='checkbox' checked={checked} onChange={this.toggleCheckbox} value='terms' />{t('Accept all')}<br />
              <button className='nextBtn next shadow pure-u-7-24' disabled={!checked || status !== 'success'} onClick={this.onClick}>{t('OK')}</button>
            </div>
          </form>
          : null
        }
      </Modal>
    )
  }
}

export default translate('translations')(connect(s => s)(KycYes))
