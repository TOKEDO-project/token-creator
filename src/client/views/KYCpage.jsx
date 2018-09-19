import React from 'react'
import { translate } from 'react-i18next'
import './Pages.css'
class KYCpage extends React.Component {
  render () {
    const { t } = this.props
    return (
      <div id='faqPage' className='pure-u-1 d-flex flex-column flex-v-center pages'>
        <div className='box shadow pure-u-1 pure-u-sm-1 pure-u-md-22-24 pure-u-lg-15-24 pure-xl-15-24'>
          <h4 className='centerTxt'>{t('KYC')}</h4>
        </div>
        <ScrollButton scrollStepInPx='50' delayInMs='16.66' />
      </div>
    )
  }
}

class ScrollButton extends React.Component {
  constructor () {
    super()

    this.state = {
      intervalId: 0
    }
  }

  scrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop () {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render () {
    return <button title='Back to top' className='scroll shadow'
      onClick={() => { this.scrollToTop() }}>
      <span className='fa fa-chevron-up' />
    </button>
  }
}

export default translate('translations')(KYCpage)
