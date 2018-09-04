import React from 'react'
import { translate } from 'react-i18next'

class HelpPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const {t} = this.props
    return (<div>{t('HelpPage')}</div>)
  }
}

export default translate('translations')(HelpPage)
