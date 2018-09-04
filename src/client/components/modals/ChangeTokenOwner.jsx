import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import Modal from '../Modal'
import { WarningMessage } from '../WarningMessage'
import TokenAddress from '../steps/TokenAddress'
import WalletSelection from '../steps/WalletSelection'

class ChangeTokenOwner extends React.Component {
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
      <Modal visible={visible} title={t('ChangeTokenOwner')} toggleVisibility={this.toggleVisibility}>
        <WarningMessage title={t('WARNING: This action can not be undone')} description={t('Double check your new address before sending the transaction')} backgroundColor='#888888' icon='exclamation-triangle' shadow />
        <WalletSelection />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(ChangeTokenOwner)))
