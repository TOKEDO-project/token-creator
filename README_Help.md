# Getting Started

## What is the Tokedo Token Creator?

The Tokedo Token Creator is a standalone client application that allows you to build all the smart contracts required for a token sale, even without knowing anything about smart contract development. From the issuance of an ERC20/ERC223 standard token to the launch of an ICO, our software has got you covered. You don’t need to know how to program a smart contract to create your token and token sales. The Token Creator takes care of all the technical subtleties, leaving you the possibility to customize your token and your token sales as you please.

# Token Design

## How to choose the Token Name?

- The name can start with a capital letter.
- It should not have any blank spaces, so use just one word, or use an underscore instead of space.
- The name of the token must be unique, as it will the name everyone will use to address your token. Think about coins like Ethereum or Bitcoin. Choose a name that represents your project.

## How to choose the Token Ticker?

You need to choose a symbol, or ticker, for your token. 
For example, Ethereum is identified with the ETH ticker, Bitcoin with BTC, Euro with EUR, Dollar with USD. 
Find a ticker that has a connection to your name. The ticker must be all capitalized and can have 3 or 4 characters only. 
Choose wisely to avoid similarities that could cause confusion. 
Check on <a href="https://coinmarketcap.com/" target="_blank" >Coinmarketcap</a> or other websites if a ticker is already taken and pick one that is not in use.

## What are Token Decimals?

Token decimals determine the number of digits that follow the decimal separator of your token. 
You can specify any number from zero to 18. 
The maximum number of decimals that you can set is 18, because the Token Creator will generate a token on the Ethereum blockchain and on the Ethereum network the maximum amount of decimals that a token can have is 18.

## What is Total Supply?

Total supply cannot be changed at a later time! You will not be able to add or remove tokens from the total supply.

## How to choose the Token Type?

-  **Simple**<br/>
It’s a token that is very easy to use, without any kind of extra functionality.
- **Startable**<br/>
The startable feature gives you the advantage to decide when to unlock the token. Usually you might want to keep it locked during the sale, and make it possible to sell and transfer it once the token sale is concluded. See how to unlock the token <a href="#unlock">here</a>.
- **Startable and Burnable**<br/>
In addition to the functionalities of the startable token, the burnable feature makes it possible to buy-back and burn the token and reduce the total supply.

## Which wallets work with the Token Creator?

In order to deploy the smart contract of your token you need to make a data transaction from your address, choosing one of the wallets supported by the token creator. For the time being you can choose between Atomax, that it is the wallet of the Tokedo Ecosystem (available for <a href="https://itunes.apple.com/us/app/atomax-wallet-lite/id1415885195" target="_blank">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.atomax_wallet" target="_blank">Android</a>), or Metamask (an extension for Chrome or Firefox browsers). It is important that the address that you are using for the transaction has at least a little amount of Ether, in order to pay the gas for the transaction.

## How to know the Token was successfully created?

At the end of the process you will see a message informing you that the token is now live and you will be given the address of your Token’s contract. You can copy the address and check it on Etherscan and similar sites. You can now proceed to create the contract of the token sale.

## How to manage the token?

Once you created your token, you can see all the details in the main dashboard. This is now the home page of your application. Here you have the list of the tokens that you have created so far. From this page you can check all the information about your token, you can add a token sale and you can also unlock the token, change the owner, or authorize a transfer. If you want to sell your tokens you will need to Add a token sale, so just click on the Add Token Sale button and follow the instructions. Here you can manage the token sale of each one of your tokens, or create a new token using the Create New Token button.

# Token Sale

## How to launch a Token Sale?

**1) Creating A Project**

After the creation of the token, deploying the smart contract of the Project is the first step required in order to launch your token sale.

This passage is required to add the different token sale contracts for your token. You need to determine the total amount of tokens you want to allocate for sale. This is a preliminary passage to initialize the token sales that you will then create and for which you will be able to choose different parameters such as price, token amount, start/end date, etc.

- The first transaction will deploy to the blockchain the Project’s smart contract.
- The second transaction will send the amount of tokens that you want to sell. You can now choose the total amount of tokens you want to allocate to the sale. For example you can send 50% of the total supply. In the future you can change this quantity. You will have the ability to add more tokens or to remove some of them. Of course this amount can never exceed the total supply.
- The third transaction will authorize the Project to move the tokens. This action is only required for Startable and Startable and Burnable tokens. This is the last transaction you need to do to enable the creation of a token sale.
- Now you are ready to create your token sales.

**2) Creating the token sales**

**Step 1.** Set a price

Now that you have created a Project and allocated some tokens for sale, you can create different token sale contracts. Click on Add token sale on your dashboard. You are now required to set a Price you can have different token sales that differ from one to another in different aspects, one of them being the price of the token. This way, you can create different contracts to sell your tokens at different prices (special discounts, reservation contracts, private sales, presales, etc). For the time being you are required to set the price in Ether.

**Step 2.** Set an amount

You are required to indicate the amount of tokens allocated specifically to this token sale. You can have several token sales and choose for each token sale a specific amount of tokens. This amount cannot exceed the total amount of tokens that you allocated for sale when you created the Project. You can always increase or decrease that amount of tokens of the Project by clicking Add more tokens or Remove tokens in your dashboard.

**Step 3.** Setting other parameters

- **Minimum contribution.** The minimum amount of Ether required to participate. By specifying a minimum contribution you will avoid transactions below a certain amount. For example, you can set the minimum contribution to 0.1 ETH. This means that the smart contract will not accept transactions below 0.1 ETH.
- **Fund owner.** The Ethereum address where all the Ether of the token sale is collected. By default the Token Creator will use the same address that you used to deploy the token and that is the owner of the all the smart contracts. But you can specify another address. Please double check your address in order to be sure that it is correct. If you input a wrong address you will lose all the Ether collected by this smart contract.
- **KYC.** Choose whether to add the KYC premium feature or not.
- **Start and end date.** You can choose the period of time during which that specific token sale smart contract can accept a transaction. So when the date is due, that precise smart contract will not accept transactions anymore. You have the possibility to open a token sale again, by changing the ending date. Remember you can have different token sales over different periods of time.

## How can I change the settings of my token sale?

You can see all your token sales in your dashboard, here you can also change settings.

## Is it possible to authorize special transactions when the token is locked?

If your token is startable, this means that no one can transfer the token. If you need to enable some address to transfer the tokens you can do so by adding them to a list. With the authorize transfer function you can specify one or more addresses that are able to transfer the token even if the token is still locked. This can be helpful if, for example, you need to move a certain amount of token from one address to another.

<h2 id="unlock"> How to unlock the Token? What happens when it’s unlocked?</h2>

If you choose to create a startable token, this token cannot be transferred unless you unlock it. Generally you might want to do this action when your token sale is over. This action cannot be undone so use it carefully. When you perform this transaction, you will unlock the token and anyone will be able to transfer it at any time.

## It is possible to remove or add tokens from or to a token sale at a later time?

You can only remove or add tokens from or to the contract of the Project, and not from or to a single token sale. If you want to sell more tokens than the amount that is available for sale at a given moment, you can add more tokens to the Project from your dashboard and then create more token sales. Remember, you cannot exceed the amount of the total supply. The maximum amount of tokens that you can add for sale can never exceed the total supply, minus the tokens that have already been sold.

When removing tokens from the Project of course you can only remove tokens that have not been sold already.

# KYC

## What is KYC?

KYC stands for Know Your Customer. Token sales and companies alike are required to screen their buyers for AML. Tokedo Token Creator provides token sales and companies with a KYC service to screen their buyers.

You can find the information in the <a href="https://creator.tokedo.io/kyc" target="_blank" >KYC page</a>
