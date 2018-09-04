import React from 'react'
import { translate } from 'react-i18next'

class Credits extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const {t} = this.props
    return (<div>{t('Credits')}</div>)
  }
}

export default translate('translations')(Credits)
