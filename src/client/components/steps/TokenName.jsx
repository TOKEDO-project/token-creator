import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setName } from '../../redux/addToken'
import icon from '../../assets/images/token-name.svg'
import './InnerStepSingleInput.css'

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
      <div className='inner-step'>
        <div className='top d-flex flex-row flex-h-start flex-v-center'>
          <div className='left'>
            <img className='icon' src={icon} alt='Icon' />
          </div>
          <div className='right d-flex flex-column flex-h-center'>
            <span className='title'>Insert the name of your token:</span>
            <span className='description'>The name of your token. Like 'Ethereum'</span>
          </div>
        </div>
        <div className='bottom d-flex flex-row flex-h-between'>
          <div className='input-box d-flex flex-column flex-v-center'>
            <input className='token-name' value={addToken.name} onChange={this.onChangeText} />
            {!valid && addToken.name.length > 0 ? <div className='tooltip d-flex flex-row flex-v-center'><div className='triangle' />Stringa piu lunga di 3 caratteri</div> : null}
          </div>
          {nextFunction ? <button disabled={!valid} onClick={nextFunction} >
          Next
          </button> : null}
        </div>
      </div>
    )
  }
}

export default connect(s => s)(TokenName)
