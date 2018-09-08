import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import UnlockTheToken from './modals/UnlockTheToken'
import ChangeTokenOwner from './modals/ChangeTokenOwner'
import AuthorizeTransfer from './modals/AuthorizeTransfer'
import TransferTokens from './modals/TransferTokens'
import AddMoreToken from './modals/AddMoreToken'
import RemoveToken from './modals/RemoveToken'
import ChangeStartEndTimeTokenSale from './modals/ChangeStartEndTimeTokenSale'

class ModalSelector extends React.Component {
  render () {
    const { setModal, tokenId, tokenSaleTransactionId } = this.props
    return (
      <div>
        {setModal === 'unlockTheToken' ? <UnlockTheToken tokenId={tokenId} /> : null}
        {setModal === 'changeTokenOwner' ? <ChangeTokenOwner tokenId={tokenId} /> : null}
        {setModal === 'authorizeTransfer' ? <AuthorizeTransfer tokenId={tokenId} /> : null}
        {setModal === 'transferTokens' ? <TransferTokens tokenId={tokenId} /> : null}
        {setModal === 'addMoreToken' ? <AddMoreToken tokenId={tokenId} /> : null}
        {setModal === 'removeToken' ? <RemoveToken tokenId={tokenId} /> : null}
        {setModal === 'changeStartEndTimeTokenSale' ? <ChangeStartEndTimeTokenSale tokenSaleTransactionId={tokenSaleTransactionId} tokenId={tokenId} /> : null}
      </div>
    )
  }
}
export default translate('translations')(connect(s => s)(ModalSelector))
