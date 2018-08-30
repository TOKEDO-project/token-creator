import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { map } from 'lodash'
import icon from '../assets/images/token-name.svg'
import './TokenList.css'

const TokenList = (props) => {
  const { t, tokens } = props
  return (
    <div id='tokenList' className='d-flex flex-h-center'>
      <div className='pure-u-22-24 pure-u-md-18-24 pure-u-sm-20-24'>

        <div className='flexWrap flexWrapSm'>
          <div className='flexCenter pure-u-sm-1'>
            <img src={icon} />
            <h1>{t('List of the Token you have created')}</h1>
          </div>
          <div className='btn flexCenter pure-u-sm-1'>
            <a href='/token/add/wizard'>
              <button>
                <div className='flexCenter flexWrap'>
                  <span className='fa fa-plus flex-row d-flex flex-h-center flex-v-center' />
                  Create New Token
                </div>
              </button>
            </a>
          </div>
        </div>
        <div>
          {map(tokens.receipts, (receipt, key) => {
            const transaction = tokens.transactions[receipt.transactionHash]
            if (receipt.contractAddress) {
              return <div key={key}>
                {receipt.contractAddress}<br />{transaction.name} - {transaction.symbol} - {transaction.supply} - {transaction.decimals} - {transaction.type}
                <a href={`/token/details/${receipt.contractAddress}`}><button>details</button></a>
              </div>
            }
          })}
        </div>
        <div className='cards shadow d-flex flex-h-center'>
          <div className='pure-u-23-24 d-flex flex-v-center'>
            <div className='pure-u-md-1-2 pure-u-sm-1 '>
              <div className='border pure-u-1-3'>
                <div className='partCard d-flex flex-h-center flex-column'>
                  <h4>
                    Token Name
                  </h4>
                  <p>TOKEDO</p>
                </div>
              </div>
              <div className='partCard border pure-u-1-3'>
                <div className='partCard d-flex flex-h-center flex-column'>
                  <h4>
                    Token Symbol
                  </h4>
                  <p>TKD</p>
                </div>
              </div>
              <div className='partCard border pure-u-1-3'>
                <div className='partCard d-flex flex-h-center flex-column'>
                  <h4>
                    Decimal
                  </h4>
                  <p>18</p>
                </div>
              </div>
            </div>

            <div className='pure-u-md-1-4 pure-u-sm-1 partCard'>
              <div className='partCard d-flex flex-h-center flex-column'>
                <h4>
                    Total Supply
                </h4>
                <p>18,000,000,000</p>
              </div>
            </div>
            <div className='pure-u-md-1-4 pure-u-sm-1' >
              <a>
                <button>
                    Manage Token &#38; Token Sale
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className='pure-u-1 d-flex flex-v-center flex-h-center'>

          <div className='videoContainer pure-u-md-2-3 pure-sm-1 pure-u-2-3  d-flex flex-v-center flex-h-center'>
            <span className='fa fa-play-circle-o' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenList))
