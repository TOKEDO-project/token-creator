import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setName } from '../../redux/addToken'

class TokenName extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valid: false
    }
  }
  onChangeText = (e) => {
    const value = e.target.value

    const { dispatch } = this.props
    dispatch(setName(value))
    this.setState({
      valid: this.validate(value)
    })
  }

  validate = (input) => {
    const { setValid } = this.props
    const valid = input.length > 3

    if (setValid) {
      setValid(valid)
    }
    return valid
  }
  componentWillMount () {
    const { addToken } = this.props
    this.setState({ valid: this.validate(addToken.name) })
  }

  render () {
    const { addToken, nextFunction } = this.props
    const { valid } = this.state

    return (
      <div>
        <div>Insert the name of your token:</div>
        <input name='tokenName' value={addToken.name} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
        {!valid && addToken.name.length > 0 ? <div>Stringa piu lunga di 3 caratteri</div> : null}
      </div>
    )
  }
}

export default connect(s => s)(TokenName)
