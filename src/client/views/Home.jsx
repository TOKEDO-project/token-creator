import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const { t } = this.props
    return (<div> {t('Home')} <div><a href='/token/add/wizard'>{t('START NOW!')}</a></div> </div>)
  }
}

export default translate('translations')(connect(s => s)(Home))
