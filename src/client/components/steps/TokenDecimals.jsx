import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDecimals } from '../../redux/addToken'

class TokenDecimals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }

  onChangeText = (e) => {
    const value = e.target.value
    const { dispatch } = this.props

    dispatch(setDecimals(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input >= 0 && input <= 18

    if (setValid) {
      setValid(valid)
    }
    return valid
  }

  componentWillMount () {
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.decimals) })
  }

  render () {
    const { addToken, nextFunction } = this.props
    const { valid } = this.state

    return (
      <div>
        <div>Insert the decimals of your token:</div>
        <input value={addToken.decimals} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
        {!valid && addToken.decimals.length > 0 ? <div>Inserire un intero tra 0 e 18</div> : null}
      </div>
    )
  }
}

export default connect(s => s)(TokenDecimals)
