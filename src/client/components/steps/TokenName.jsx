import React, { Component } from 'react'

class TokenName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: false,
      text: ''
    }
  }

  onChangeText = (e) => {
    const value = e.target.value
    const textLength = value.length
    this.setState({
      text: value,
      valid: textLength > 3
    })
  }

  render () {
    const { nextFunction } = this.props
    const { valid, text } = this.state

    return (
      <div>
        <div>Insert the name of your token:</div>
        <input value={text} onChange={this.onChangeText} />
        {nextFunction ? <button disabled={!valid} onClick={nextFunction} >Next</button> : null}
      </div>
    )
  }
}

export default TokenName
