import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import icon from '../../assets/images/token-live.svg'
import './Step.css'
import './StepCopyField.css'
import { translate } from 'react-i18next'
import './TokenAddress.css'
import Clipboard from 'react-clipboard.js'
import { setState } from '../../redux/addMainTokenSale'
import { StepHeader } from './parts/StepHeader'

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
  redirectTo = (href) => {
    const { history } = this.props
    history.push(href)
  }
  redirectToTokenSale = (href, tokenId) => {
    const { history, dispatch } = this.props
    dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    console.log('redirectToTokenSale', tokenId, href)
    history.push(href)
  }
  render () {
    const { t, match: { params: { tokenId } } } = this.props
    const { addressCopied } = this.state
    return (
      <div id='token-address' className='step-container pure-u-22-24 pure-u-sm-20-24 pure-md-18-24 d-flex flex-column'>
        <div className='step alone pure-u-1 d-flex flex-column flex-h-between'>
          <StepHeader
            icon={icon}
            title={t(`Your token is now live!`)}
          >
            {t(`Congratulation, your token is now on the ethereum blockchain`)}
          </StepHeader>
          <form className='bottom d-flex flex-row flex-h-between'>
            <div className={`clipboard-field shadow ${addressCopied ? 'copied' : ''} pure-u-1`}>
              <div className='pure-u-16-24 font-size-small'>
                {tokenId}
              </div>
              <Clipboard onSuccess={this.onSuccess} data-clipboard-text={tokenId} type='button' className='pure-u-8-24'>
                <div>
                  <span className={`fa fa-${addressCopied ? 'check' : 'clipboard'}`} />
                  <span className='font-size-tiny'>{addressCopied ? 'Copied' : 'Copy'}</span>
                </div>
              </Clipboard>
            </div>
          </form>
        </div>
        <div className='pure-u-1 d-flex flex-row flex-h-between'>
          <button onClick={() => this.redirectTo(`/`)} className='close pure-u-11-24 font-weight-bold' type='button'>Close</button>
          {/* <a className='pure-u-11-24' href={`/token/details/${tokenId}`}> */}
          <button onClick={() => this.redirectToTokenSale(`/token/details/${tokenId}`, `${tokenId}`)} className='deploy pure-u-11-24 font-weight-bold' type='button'>Deploy the Token Sale</button>
          {/* </a> */}
        </div>
      </div>
    )
  }
}

export default withRouter(translate('translations')(connect(s => s)(TokenAddress)))
