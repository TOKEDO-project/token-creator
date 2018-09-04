import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { map } from 'lodash'
import icon from '../assets/images/token-name.svg'
import './TokenList.css'

const TokenList = (props) => {
  const { t, tokens, addMainTokenSale } = props
  console.log(tokens, 'tokens')
  return (
    <div id='tokenList' className='d-flex flex-h-center pure-u-1'>
      <div className='maxWidth pure-u-22-24 pure-u-md-18-24 pure-u-sm-20-24'>

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
                  {t('Create New Token')}
                </div>
              </button>
            </a>
          </div>
        </div>

        <div>
          {map(tokens.receipts, (receipt, key) => {
            const transaction = tokens.transactions[receipt.transactionHash]
            let mainTokenSale = false
            if (!addMainTokenSale[key] || addMainTokenSale[key].state === 'authorized') {
              mainTokenSale = addMainTokenSale[key]
              console.log('mainTokenSale', mainTokenSale)
            }

            if (receipt.contractAddress) {
              return <div key={key} className='cards shadow d-flex flex-h-center'>
                <div className='pure-u-23-24'>
                  <div className='pure-u-md-1-2 pure-u-sm-1 '>
                    <div className='border pure-u-1-3'>
                      <div className='partCard d-flex flex-h-center flex-column'>
                        <h4>
                          {t('Token Name')}
                        </h4>
                        <p>{transaction.name}</p>
                      </div>
                    </div>
                    <div className='partCard border pure-u-1-3'>
                      <div className='partCard d-flex flex-h-center flex-column'>
                        <h4>
                          {t('Token Symbol')}
                        </h4>
                        <p>{transaction.symbol}</p>
                      </div>
                    </div>
                    <div className='partCard border pure-u-1-3'>
                      <div className='partCard d-flex flex-h-center flex-column'>
                        <h4>
                          {t('Token Decimal')}

                        </h4>
                        <p>{transaction.decimals}</p>
                      </div>
                    </div>
                  </div>

                  <div className='pure-u-md-1-4 pure-u-sm-1 partCard'>
                    <div className='partCard d-flex flex-h-center flex-column'>
                      <h4>
                        {t('Token Supply')}
                      </h4>
                      <p>{transaction.supply}</p>
                    </div>
                  </div>
                  <div className='pure-u-md-1-4 pure-u-sm-1' >
                    <a href={`/token/details/${receipt.contractAddress}`}>
                      <button>
                        {t('Manage Token')} &#38; {t('Token Sale')}
                        {mainTokenSale ? <span><br />{t('Token for Sale')}: {mainTokenSale.amount}</span> : null }
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            }
          })}
        </div>

        <div className='pure-u-1 d-flex flex-v-center flex-h-center'>
          <div className='videoContainer pure-u-md-2-3 pure-sm-1 pure-u-1  d-flex flex-v-center flex-h-center'>
            <span className='fa fa-play-circle-o' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TokenList))
