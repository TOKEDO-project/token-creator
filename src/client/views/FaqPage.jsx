import React from 'react'
import { translate } from 'react-i18next'
import './Pages.css'
class FaqPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const { t } = this.props
    return (
      <div id='faqPage' className='pure-u-1 d-flex flex-column flex-v-center pages'>
        <div className='box shadow pure-u-1 pure-u-sm-1 pure-u-md-22-24 pure-u-lg-15-24 pure-xl-15-24'>
          <h4 className='centerTxt'>{t('Faq')}</h4>
          <h3>{t('Getting Started')}</h3>
          <p><span>{t('What is the Tokedo Token Creator?')}</span></p>
          <p>{t('The Tokedo Token Creator is a standalone client application that allows you to build all the smart contracts required for a token sale - from the issuance of an ERC20/ERC223 standard token to the launch of an ICO - even without knowing anything about smart contract development. You don’t need to know how to program a smart contract to create your token and all your token sales. The Token Creator takes care of all the technical subtleties, leaving you the possibility to customize your token and your token sales as you please.')}</p>

          <p><span>{t('Are you a developer?')}</span></p>
          <p>{t('The application is open source and you can easily find it at ')}<a href='https://github.com/TOKEDO-project/token-creator' target='_blank'>GitHub.org</a>.</p>

          <h3>{t('Token Design')}</h3>
          <p><span>{t('How to choose the Token Name?')}</span></p>
          <p>{t('This is the first step to create your token. Remember:')}</p>
          <ul>
            <li>{t('The name can start with a capital letter ')}</li>
            <li>{t('It should not have any blank space, so use just one word, or use underscore instead of space.')}</li>
            <li>{t('The name of the token must be unique and it is the name that everyone will use to address your token. Think about coins like Ethereum or Bitcoin. Choose a name that represents your project.')}</li>
          </ul>
          <p><span>{t('How to choose the Token Ticker?')}</span></p>
          <p>{t('You need to choose a symbol, or ticker, for your token. For example, Ethereum is identified with the ETH ticker, Bitcoin with BTC, Euro with EUR, Dollar with USD. Find a ticker that has a connection with your name. The ticker must be all capital letters and can have 3 or 4 characters only. Choose wisely in order to avoid collision. Check on ')}<a href='https://coinmarketcap.com/' target='_black'>Coinmarketcap</a>{t(' or other websites if a ticker is already taken and choose one that is not used by anyone.')}</p>

          <p><span>{t('What are Token Decimals?')}</span></p>
          <p>{t('Token decimals state the number of figures that follow the zero for your token. You can specify any number from zero to 18. The maximum number of decimals that you can set is 18, because the Token Creator will generate a token on the Ethereum blockchain and on the Ethereum network the maximum amount of decimals that a token can have is 18.')}</p>

          <p><span>{t('What is Total Supply?')}</span></p>
          <p>{t('Total supply is the maximum amount of tokens that you want to generate. Tokens generated with the Tokedo Token Creator are already mined. This means that the total amount of tokens available in the network will be fixed from the very beginning. So you have to choose a total supply, a maximum number of tokens, and this number will be the total amount of tokens that you will have in the smart contract generated from the Token Creator. NOTE: Total supply cannot be changed at a later time! You will not be able to add or remove tokens from the total supply.')}</p>

          <p><span>{t('How to choose the Token Type?')}</span></p>
          <p>{t('The token creator gives you the possibility to choose among three token options:')}</p>
          <ul>
            <li><span>{t('Simple')}</span><br />{t('It’s a token that is very easy to use, without any kind of extra functionality.')}</li>
            <li><span>{t('Startable')}</span><br />{t('Adding the startable features gives you the advantage to decide when to unlock the token. Usually you might want to keep it locked during the sale and make it possible to sell and transfer it once the token sale is concluded. See how to unlock the token ')}<a href='#Unlock'>{t('here')}</a>.</li>
            <li><span>{t('Startable and Burnable')}</span><br />{t('The burnable feature makes it possible to burn the token and reduce the total supply, giving you the possibility to affect the price of the token.')}</li>
          </ul>

          <p><span>{t('What wallet is it possible to use on the Token Creator?')}</span></p>
          <p>{t('In order to deploy the smart contract of your token you need to make a data transaction from your address, choosing one of the wallets supported by the token creator. For the time being you can choose between Atomax, that it is the wallet of the Tokedo Ecosystem (available for ')}<a href='https://itunes.apple.com/us/app/atomax-wallet-lite/id1415885195' target='_blank'>{t('iOS')}</a>{t(' and ')}<a href='https://play.google.com/store/apps/details?id=com.atomax_wallet' target='_blank'>{t('Android')}</a>{t('), or Metamask (an extension for Chrome or Firefox browsers). It is important that the address that you are using for the transaction has at least a little amount of Ethereum, in order to pay the gas for the transaction.')}</p>

          <p><span>{t('How to know the Token was successfully created?')}</span></p>
          <p>{t('At the end of the process you will see a message that informs you that the token is now live and you will be given the address of your Token’s contract. You can copy the address and check it on Etherscan and similar sites. You can now proceed to create the contract of the token sale.')}</p>

          <p><span>{t('How to manage the token?')}</span></p>
          <p>{t('Once you created your token, you can see all the details in the main dashboard. This is now the home page of your application. Here you have the list of the tokens that you have created so far. From this page you can check all the information about your token, you can add a token sale and you can also unlock the token, change the owner, or authorize a transfer. If you want to sell your tokens you will need to ')}<span>{t('Add a token sale')}</span>{t(', so just click on the ')}<span>{t('Add Token Sale')}</span>{t(' button and follow the instructions. Here you can manage the token sale of each one of your tokens, or create a new token using the ')}<span>{t('Create New Token')}</span>{t(' button.')}</p>

          <h3>{t('Token Sale')}</h3>
          <p><span>{t('How to launch a Token Sale?')}</span></p>
          <p><span className='marginLeft'>1) {t('Creating A Project')}</span></p>
          <p>{t('After the creation of the token, deploying the smart contract of the Project is the first step required in order to launch your token sale.')}</p>
          <p>{t('This passage is required in order to be able to add the different token sale contracts for your token. You are now required to choose the total amount of tokens you want to allocate for sale. This is a preliminary passage to initialize the token sales that you will then create and for which you will be able to choose different parameters such as price, token amount, start and end date, etc.')}</p>

          <p>{t('To create the Project you will need to send three transactions: ')}</p>
          <ul>
            <li>{t('The first transaction will deploy to the blockchain the smart contract of the Project. ')}</li>
            <li>{t('The second transaction will send the amount of tokens that you want to sell. You can now choose the total amount of tokens you want to allocate to the sale. For example you can send 50% of the total supply. In the future you can change this quantity. You will have the ability to add more token or to remove some of them. Of course this amount can never exceed the total supply.')}</li>
            <li>{t('The third transaction will authorize the Project to move the tokens. This action is only required for')}<span>{t(' Startable ')}</span>{t('and')}<span>{t(' Startable and Burnable ')}</span>{t('tokens. This is the last transaction you need to do to enable the creation of a token sale.')}</li>
          </ul>
          <p><span>{t('Now you are ready to create your token sales.')}</span></p>
          <p><span className='marginLeft'>2) {t('Creating the token sales')}</span></p>
          <p><span>{t('Step 1. Set a price')}</span></p>
          <p>{t('Now that you have created a Project and allocated some tokens for sale, you can create different token sale contracts. Click on ')}<span>{t('Add token sale')}</span>{t(' on your dashboard. You are now required to set a ')}<span>{t('Price')}</span>{t(' for your token. Remember: you can have different token sales that differ from one to another in different aspects, one of this being the price of the token. This way, you can create different contracts to sell your tokens at different prices (special discounts, reservation contracts, private sales, presales, etc). For the time being you are required to set the price in Ethereum.')}</p>
          <p><span>{t('Step 2. Set an amount')}</span></p>
          <p>{t('You are required to indicate the amount of tokens allocated specifically to this token sale. You can have several token sales and choose for each token sale a specific amount of tokens. This amount cannot exceed the total amount of tokens that you allocated for sale when you created the Project. You can always increase or decrease that amount of tokens of the Project by ')}<span>{t('clicking Add more tokens')}</span>{t(' or ')}<span>{t('Remove tokens ')}</span>{t('in your dashboard.')}</p>
          <p><span>{t('Step 3. Setting other parameters')}</span></p>
          <p>{t('You will be asked to set all the parameters of the token sale:')}</p>
          <ul>
            <li><span>{t('Minimum contribution. ')}</span>{t('The minimum amount of Ether required to participate. By specifying a minimum contribution you will avoid transactions below a certain amount. For example, you can set the minimum contribution to 0.1 ETH. This means that the smart contract will not accept transactions below 0.1 ETH.')}</li>
            <li><span>{t('Fund owner. ')}</span>{t('The Ethereum address where all the Ether of the token sale is collected. By default the Token Creator will use the same address that you used to deploy the token and that is the owner of the all the smart contracts. But you can specify another address. Please double check your address in order to be sure that it is correct. If you input a wrong address you will lose all the Ether collected by this smart contract.')}</li>
            <li><span>{t('KYC. ')}</span>{t('Choose whether to use Atomax KYC for your buyers or not.')}</li>
            <li><span>{t('Start and end date. ')}</span>{t('You can choose the period of time during which that specific token sale smart contract can accept a transaction. So when the date is due, that precise smart contract will not accept transactions anymore. You have the possibility to open a token sale again, by changing the ending date. Remember you can have different token sales over different periods of time.')}</li>
          </ul>
          <p><span>{t('How can I change the settings of my token sale?')}</span></p>
          <p>{t('You can see all your token sales in your dashboard, here you can also change settings.')}</p>

          <p><span>{t('Is it possible to authorize special transactions when the token is locked?')}</span></p>
          <p>{t('If your token is startable, this means that no one can transfer the token. If you need to enable some address to transfer the tokens you can do so by adding them to a list. With the ')}<span>{t('authorize transfer')}</span>{t(' function you can specify one or more addresses that are able to transfer the token even if the token is still locked. This can be helpful if, for example, you need to move a certain amount of token from one address to another.')}</p>

          <p id='Unlock'><span>{t('How to unlock the Token? What happens when it’s unlocked?')}</span></p>
          <p>{t('If you choose to create a startable token, this token cannot be transferred unless you unlock it. Generally you might want to do this action when your token sale is over. This action cannot be undone so use it carefully. When you perform this transaction, you will unlock the token and anyone will be able to transfer it at any time.')}</p>
          <p><span>{t('It is possible to remove or add tokens from or to a token sale at a later time?')}</span></p>
          <p>{t('You can only remove or add tokens from or to the contract of the Project, and not from or to a single token sale. If you want to sell more tokens than the amount that is available for sale at a given moment, you can add more tokens to the Project from your dashboard and then create more token sales. Remember, you cannot exceed the amount of the total supply. The maximum amount of tokens that you can add for sale can never exceed the total supply, minus the tokens that have already been sold.')}</p>

          <p>{t('When removing tokens from the Project of course you can only remove tokens that have not been sold already.')}</p>
          <h3>{t('KYC')}</h3>
          <p><span>{t('What is KYC?')}</span></p>
          <p>{t('KYC stands for Know Your Customer. Token sales and companies alike are required to screen their buyers to be compliant with the current legislation in most countries. Tokedo Token Creator provides token sales and companies with a service to screen their users and be KYC-compliant.')}</p>
        </div>
        <ScrollButton scrollStepInPx='50' delayInMs='16.66' />
      </div>
    )
  }
}

class ScrollButton extends React.Component {
  constructor () {
    super()

    this.state = {
      intervalId: 0
    }
  }

  scrollStep () {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop () {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  render () {
    return <button title='Back to top' className='scroll shadow'
      onClick={() => { this.scrollToTop() }}>
      <span className='fa fa-chevron-up' />
    </button>
  }
}

export default translate('translations')(FaqPage)
