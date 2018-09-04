import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import UnlockTheToken from './modals/UnlockTheToken'

class ModalSelector extends React.Component {
  render () {
    const { setModal, tokenId } = this.props
    return (
      <div>
        {setModal === 'unlockTheToken' ? <UnlockTheToken tokenId={tokenId} /> : null}
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(ModalSelector))
