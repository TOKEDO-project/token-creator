import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import Modal from '../Modal'

class TransferTokens extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true
    }
  }
  toggleVisibility = () => {
    const { history, tokenId } = this.props
    // this.setState({ visible: !this.state.visible })
    history.push(`/token/details/${tokenId}`)
  }
  render () {
    const { t } = this.props
    const { visible } = this.state
    return (
      <Modal visible={visible} title={t('transferTokens')} toggleVisibility={this.toggleVisibility}>
        {t('Ciao')}
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(TransferTokens)))
