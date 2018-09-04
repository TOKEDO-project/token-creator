import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import changeOwner from '../../assets/images/change-owner.svg'
import Modal from '../Modal'
import { WarningMessage } from '../WarningMessage'
import TokenSaleOwnerAddress from '../steps/TokenSaleOwnerAddress'
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
      <Modal icon={changeOwner} visible={visible} title={t('Change Token Owner')} toggleVisibility={this.toggleVisibility}>
        <WarningMessage title={t('WARNING: This action can not be undone')} description={t('Double check your new address before sending the transaction')} backgroundColor='#D93D3D' icon='exclamation-triangle' shadow />
        <div className='separator' />
        <TokenSaleOwnerAddress />
        <div className='separator' />
        <WalletSelection />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(ChangeTokenOwner)))
