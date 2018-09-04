import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import minus from '../../assets/images/minus.svg'
import Modal from '../Modal'
import { WarningMessage } from '../WarningMessage'
import WalletSelection from '../steps/WalletSelection'
import TokenSaleRemoveAmount from '../steps/TokenSaleRemoveAmount'

class RemoveToken extends React.Component {
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
      <Modal icon={minus} visible={visible} title={t('Remove Token')} toggleVisibility={this.toggleVisibility}>
        <WarningMessage title={t('WARNING: This action can not be undone')} description={t('Be careful, if you confirm this you are going to delete your token.')} backgroundColor='#D93D3D' icon='exclamation-triangle' shadow />
        <div className='separator' />
        <TokenSaleRemoveAmount />
        <div className='separator' />
        <WalletSelection />
      </Modal>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(RemoveToken)))
