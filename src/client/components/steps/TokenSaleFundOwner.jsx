import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFundOwner } from '../../redux/addTokenSale'

class TokenSaleFundOwner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch } = this.props
    dispatch(setFundOwner(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input.length > 2

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addTokenSale } = this.props
    this.setState({ valid: this.validate(addTokenSale.fundOwner) })
  }

  render () {
    const { addTokenSale, nextFunction } = this.props
    const { valid } = this.state

    return (
      <div>
        <div>Insert the owner address:</div>
        <input name='owner' value={addTokenSale.fundOwner} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
        {!valid && addTokenSale.fundOwner.length > 0 ? <div>Stringa piu lunga di 2 caratteri</div> : null}
      </div>
    )
  }
}

export default connect(s => s)(TokenSaleFundOwner)
