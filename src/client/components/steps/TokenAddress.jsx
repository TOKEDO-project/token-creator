import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from '../../assets/images/token-live.svg'
import './Step.css'
import './StepCopyField.css'
import { translate } from 'react-i18next'
import './TokenAddress.css'
import Clipboard from 'react-clipboard.js'

class TokenAddress extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addressCopied: false
    }
  }

  onSuccess = () => {
    this.setState({ addressCopied: true })
  }

  render () {
    const { contractAddress, t } = this.props
    const { addressCopied } = this.state
    return (
      <div id='token-address' className='step-container pure-u-1 d-flex flex-column'>
        <div className='step shadow pure-u-1 d-flex flex-column flex-h-between'>
          <div className='top d-flex flex-row flex-h-start flex-v-center'>
            <div className='left'>
              <img className='icon' src={icon} alt='Icon' />
            </div>
            <div className='right d-flex flex-column flex-h-center'>
              <span className='title'>{t(`Your token is now live!`)}:</span>
              <span className='description font-size-tiny'>{t(`Congratulation, your token is now on the ethereum blockchain`)}</span>
            </div>
          </div>
          <form className='bottom d-flex flex-row flex-h-between'>
            <div className={`clipboard-field shadow ${addressCopied ? 'copied' : ''} pure-u-1`}>
              <div className='pure-u-16-24 font-size-small'>
                {contractAddress}
              </div>
              <Clipboard onSuccess={this.onSuccess} data-clipboard-text={contractAddress} type='button' className='pure-u-8-24'>
                <span className={`fa fa-${addressCopied ? 'check' : 'clipboard'}`} />
                <span className='font-size-tiny'>${addressCopied ? 'Copied' : 'Copy'}</span>
              </Clipboard>
            </div>
          </form>
        </div>
        <div className='pure-u-1 d-flex flex-row flex-h-between'>
          <a className='pure-u-11-24' href='/'><button className='close pure-u-1 font-weight-bold' type='button'>Close</button></a>
          <a className='pure-u-11-24' href={`/token/details/${contractAddress}`}><button className='deploy pure-u-1 font-weight-bold' type='button'>Deploy the Token Sale</button></a>
        </div>
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(TokenAddress))
