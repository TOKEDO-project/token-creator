import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { setTerms } from '../redux/preferences'
import './TermsAndConditions.css'
import shuttle from '../assets/images/shuttle.svg'

const TermsAndConditions = ({dispatch, t}) => {
  return (
    <div id='tac' className='pure-u-1 d-flex flex-column flex-v-center'>
      <img className='shuttle' src={shuttle} alt='Shuttle' />
      <div className='box shadow pure-u-1 pure-u-sm-1 pure-u-md-22-24 pure-u-lg-15-24 pure-xl-15-24'>
        <h2 className='centerTxt'>{t('Terms and Conditions')}</h2>

        <div className='text'>
          <p><span >{t('ATTENTION')}: </span>{t('PLEASE READ CAREFULLY THESE TERMS AND CONDITIONS AS THEY AFFECT YOUR OBLIGATIONS AND LEGAL RIGHTS, INCLUDING, BUT NOT LIMITED TO WAIVERS OF RIGHTS AND LIMITATION OF LIABILITY. IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS DO NOT PROCEED WITH USING THE TOKEDO TOKEN CREATOR.')}</p>

          <h3 className='centerTxt'>1. {t('Agreement')}</h3>
          <p>{t('This is a contract between you and Tokedo Ltd, a limited company incorporated in Isle of Man or any other legal entity that succeeds Tokedo Ltd or may be further incorporated (“Company”) and that holds the rights to Tokedo Token Creator (“Token Creator”), website www.tokedo/token-creator or any associated websites or mobile applications. By signing upto or using the Token Creator, you agree that you are eligible for use of the Token Creator and that you have read, understood, and accept these Terms and conditions, as well as our Privacy Policy and Cookie Policy.')}</p>

          <h3 className='centerTxt'>2. {t('Eligibility')}</h3>
          <p>{t('You are allowed to use the Token Creator if you are eligible in accordance with the law of your residence. The Company has no obligation or capability to verify whether you are eligible to use the Token Creator and bears no responsibility for your use of the Token Creator. The Company reserves a right to block your Tokedo Account on the Token Creator if we have any doubts with regard to your eligibility.')}</p>

          <h3 className='centerTxt'>3. {t('Services')}</h3>
          <p><span>3.1.</span> {t('You may use the Token Creator under these Terms and conditions and receive the following services (“Token Creator Services”)')}:</p>
          <p><span className='marginLeft'>a)</span> {t('Generation of the smart contract of the token that allows you to issue customized digital items (“Tokens”)')};</p>
          <p><span className='marginLeft'>b)</span> {t('Generation of the smart contract of the token sale that allows you to launch a customized ICO (Initial Coin Offering) or DAICO (Decentralized Autonomous Initial Coin Offering) for your tokens')};</p>
          <p><span className='marginLeft'>c)</span> {t('Screening of your buyers with different levels of identity verification, in compliance with KYC (Know Your Customer) legislation (Premium Service)')}.</p>
          <p><span>3.2.</span> {t('The Company grants you a limited nonexclusive nontransferable revocable license to use the Token Creator free of charge (Premium Services excluded)')}.</p>

          <h3 className='centerTxt'>4. {t('Token Creator ')}</h3>
          <p> <span>4.1.</span> {t('To start using the Token Creator you shall accept these Terms and conditions, the Privacy Policy and receiving all legal notices including risk statements and disclaimers. When creating an account for the Token Creator you shall ensure safety and confidentiality of your password and bear all risks related to the disclosure of your password to third parties. The Company or any affiliated person is not in possession of your password and at no event shall bear any liability in case of loss of the password or its disclosure to a third party.')}</p>
          <p> <span>4.2.</span> {t('The Company may ask you to provide at any stage additional personal information.')}</p>
          <p> <span>4.3.</span> {t('You may issue your Tokens by choosing the settings for your Tokens, such as their name, ticker, type, decimals and any other settings that may be required. You can then deploy the smart contract of the token from an Ethereum address, using Atomax Wallet or Metamask. On your Dashboard on the Token Creator you will find all the tokens you issued.')}</p>
          <p> <span>4.4.</span> {t('The Company provides you with technical opportunity to issue Tokens, you are the only person who is liable for any losses, damages, claims related to the issuance of Tokens. The Company assumes no responsibility or liability related to your issuance of Tokens or your purchase of Tokens issued using the Token Creator. Nothing on the Token Creator shall be construed as endorsement, sponsorship, affiliation, approval, backing, underwriting of any Token or any Token issuer by the Company.')}</p>
          <p> <span>4.5.</span> {t('By issuing your Tokens you warrant and represent that you have received all approvals, authorizations, licenses or registrations required by the competent authority in jurisdiction of your residence or any other applicable jurisdictions.')}</p>
          <p> <span>4.6.</span> {t('Tokens generated with the Tokedo Token Creator are not securities. You acknowledge, understand, and agree that Tokens generated with the Tokedo Token Creator are not securities and are not registered with any government entity as a security, and shall not be considered as such. You acknowledge, understand, and agree that ownershipof tokens generated with the Tokedo Token Creator  does not grant you the right to receive profits, income, or other payments or returns.')}</p>
          <p> <span>4.7.</span> {t('There is no guarantee that tokens generated with the Tokedo Token Creator will grow in value. There are no guarantees that the price of these tokens will not decrease, including significantly, due to some unforeseen events, or events over which the developers have no control, or because of force majeure circumstances.')}</p>
          <p> <span>4.8.</span> {t('Tokens generated with the Tokedo Token Creator are not an investment. Tokens generated with the Tokedo Token Creator are not official or legally binding investments of any kind. All persons and parties involved in the sale and purchase of tokens generated with the Tokedo Token Creator do so at their own risk.')}</p>

          <h3 className='centerTxt'>5. {t('Risk warning')}</h3>
          <p>{t('By accepting these Terms and Conditions, you also acknowledge that you have been warned of the following risks:')}</p>
          <p><span>5.1. {t('New Technology.')} </span>{t('You understand that cryptocurrencies including Tokedo Token Creator, Tokedo Ecosystem, Ethereum Blockchain and other associated and related technologies are new and untested and outside of your or the Company’s control and adverse changes in market forces or the technology, broadly construed, will excuse the nonperformance by the Company under this Agreement including temporary interruption or permanent termination of your access to the Platform Services.')}</p>
          <p><span>5.2. {t('Risks associated with Ethereum.')} </span>{t('Tokens generated with the Token Creator will be issued on the Ethereum blockchain. Therefore, any failure or malfunctioning of the Ethereum protocol may lead to the trading network of tokens generated with the Token Creator not working as expected.')}</p>
          <p><span>5.3. {t('Loss of funds.')} </span>{t('Tokens generated with the Token Creator will be issued on the Ethereum blockchain. Therefore, any failure or malfunctioning of the Ethereum protocol may lead to the trading network of tokens generated with the Token Creator not working as expected.')}</p>
          <p><span>5.4. {t('Regulatory uncertainty.')} </span>{t('Cryptocurrencies, Blockchain technologies have been the subject of scrutiny by various regulatory bodies around the world. The functioning of the Token Creator could be impacted by one or more regulatory inquiries or actions, including but not limited to restrictions of use of cryptocurrencies.')}</p>
          <p><span>5.5. {t('Risk of theft and hacking.')} </span>{t('Hackers or other groups or organizations may attempt to interfere with your Tokedo Account or the Token Creator performance in any number of ways, including without limitation denial of service attacks, Sybil attacks, spoofing, smurfing, malware attacks, or consensus-based attacks.')}</p>
          <p><span>5.6. {t('Risk of security weaknesses of the Token Creator. ')} </span>{t('There is a risk that the Token Creator may unintentionally include weaknesses or bugs in the source code interfering with the use of or causing the loss of Tokens and cryptocurrencies.')}</p>
          <p><span>5.7. {t('Internet transmission risks.')} </span>{t('You acknowledge that there are risks associated with using the Token Creator including, but not limited to, the failure of hardware, software, and internet connections. You acknowledge that the Company shall not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Token Creator, howsoever caused.')}</p>

          <h3 className='centerTxt'>6. {t('Your warranties and representations')}</h3>
          <p><span>6.1</span> {t('By entering these Terms and conditions you warrant and represent that:')}</p>
          <p><span className='marginLeft'>a)</span> {t('You have full capacity to contract under applicable law;')}</p>
          <p><span className='marginLeft'>b)</span> {t('You will not be furthering, performing, undertaking, engaging in, aiding, or abetting any unlawful activity through your relationshipwith us or through your use of the Token Creator;')}</p>
          <p><span className='marginLeft'>c)</span> {t('You will not use the Token Creator for illegal purposes, including money laundering of criminal proceeds, transfer or receipt of payment for planning, preparation or commitment of crime, for financing the terrorism and illegal trade;')}</p>
          <p><span className='marginLeft'>d)</span> {t('You will not use the Token Creator for any purpose prohibited by these Terms or in any manner that could damage, disable, overburden, or impair the Company;')}</p>
          <p><span className='marginLeft'>e)</span> {t('You will be complying with and obeying all applicable laws, including but not limited to securities and capital market legislation, anti-money laundering and counterfeiting terrorism, consumer protection laws, financial promotion.')}</p>

          <h3 className='centerTxt'>7. {t('No Warranties; Exclusion of Liability; Indemnification')}</h3>
          <p><span>7.1.</span> {t(' The Token Creator and its components are provided “as is”. The Token Creator and its components are under development, the Company cannot guarantee that all program functions will be available for any period in the future or that the functionality of the Token Creator will not change dramatically. The Company and its affiliates make no representations or warranties of any kind, whether express, implied, statutory or otherwise regarding the Token Creator, including any warranty that the Token Creator will be uninterrupted, error free or free of harmful components, secure or not otherwise lost or damaged. Except to the extent prohibited by law, the Company and its affiliates disclaim all warranties, including any implied warranties of merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, or quiet enjoyment, and any warranties arising out of any course of dealings, usage or trade.')}</p>
          <p><span>7.2.</span> {t('The Company shall not have any liability or responsibility for any errors or omissions in performance of the Token Creator, for your action or inaction in connection with our Token Creator or for any damage to your computer or data or funds or any other damage you may incur in connection with the Token Creator. Your use of the Token Creator is at your own risk. In no event shall the Company be liable for any direct, indirect, punitive, incidental, special or consequential damages arising out of or in any way connected with the use of the Token Creator, the delay or inability to use the Token Creator or otherwise arising in connection with our Token Creator whether based on contract, tort, strict liability or otherwise, even if advised of the possibility of any such damages.')}</p>
          <p><span>7.3.</span> {t('You agree to defend, indemnify and hold the Company harmless from and against any and all claims, damages, costs and expenses, including attorneys\' fees, arising from or related to your use of the Token Creator.')}</p>
          <p><span>7.4.</span> {t('The Company makes no representation that Token Creator Services can be received, are applicable or appropriate for use in all jurisdictions.')}</p>

          <h3 className='centerTxt'>8. {t('Third-Party Websites and content ')}</h3>
          <p>{t('The Token Creator may contain links to websites owned or operated by parties other than the Company. Such links are provided for your reference only. The Company does not monitor or control outside the Token Creator and is not responsible for their content. The inclusion of links to third party resources does not imply any endorsement of the material on the Token Creator or, unless expressly disclosed otherwise, any sponsorship, affiliation or association with its owner, operator or sponsor, nor does such inclusion of links imply that the Company is authorized to use any trade name, trademark, logo, legal or official seal, or copyrighted symbol that may be reflected in the linked website. The Company does not control the third party content including the content posted by you or other users of the Token Creator or monitor it for compliance with any requirement (e.g. truthfulness, integrity, legality). Accordingly, the Company does not bear any liability arising in connection with your access or use of the third party content.')}</p>

          <h3 className='centerTxt'>9. {t('Taxes ')}</h3>
          <p>{t('The Company bears no liability for determining whether taxes apply to any of your transactions, or for collecting, reporting, or remitting any taxes arising from any transaction.')}</p>

          <h3 className='centerTxt'>10. {t('Assignment ')}</h3>
          <p>{t('You may not transfer or assign these Terms and Conditions or any rights or obligations you have under these Terms and Conditions without our prior written consent. The Company reserves the right to freely assign or transfer these Terms and Conditions and the rights and obligations under these Terms and Conditions to any third party at any time without prior notice or consent. If you object to such transfer or assignment, you may stopusing the Token Creator and terminate these Terms and Conditions by contacting us.')}</p>

          <h3 className='centerTxt'>11. {t('Jurisdiction, applicable law')}</h3>
          <p><span>11.1.</span> {t('The Terms and conditions and any legal relationshipbetween the Parties arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales without regard to its conflict of laws rules. The Parties settle all their disputes arising out of or in connection with the Terms and conditions in accordance with the laws of England and Wales.')}</p>
          <p><span>11.2.</span> {t('The Parties agree to try in good faith to settle through negotiations any dispute, disagreement or claim arising out of or in connection with execution, termination or rescission of these terms and conditions. The claiming party shall send a message with its claim to the other party. The message in question shall contain the essentials of the claim and evidence supporting such claim.')}</p>
          <p><span>11.3.</span> {t('In the absence of a reply to the claim within 30 working days since the sending date, or if the Parties have failed to reach an amicable settlement, the dispute shall be brought and heard exclusively in appropriate court at the location of the Company determination.')}</p>

          <h3 className='centerTxt'>12. {t('Miscellaneous')}</h3>
          <p><span>12.2.</span> {t('Notices sent by email in accordance with these Terms and conditions shall be deemed to be sent on the date on which the e-mail is confirmed as being sent provided that day is a working day.')}</p>
          <p><span>12.3.</span> {t('All communications and documents to be made or given pursuant to this Agreement must be in the English language. ')}</p>
          <p><span>12.4.</span> {t('Until one Party advises the other one of the fact of the breach of security in respect of its authorized email, all actions and documents done and sent from the authorized email of one of the Parties, even if these actions and documents have been done and sent by third parties, are considered to be done and sent by the owner of the authorized email. In that case the owner of the authorized email acquires all rights and incurs all obligations, as well as bears the liability arising out of these facts.')}</p>
          <p><span>12.5.</span> {t('These terms and conditions constitute the entire agreement and understanding of the Parties and supersedes any previous agreement between the Parties relating to the subject matter of these terms and conditions. ')}</p>
          <p><span>12.5.</span> {t('If at any time any one or more of the provisions of these terms and conditions is or becomes illegal, invalid or unenforceable in any respect under any law of any jurisdiction neither the legality, validity or enforceability of the remaining provisions of these terms and conditions nor the legality, validity or enforceability of such provision under the law of any other jurisdiction shall be in any way affected or impaired as a result.')}</p>
          <p><span>12.7.</span> {t('Headings are inserted for the convenience of the parties only and are not to be considered when interpreting this Agreement. Words in the singular mean and include the plural and vice versa. Words in the masculine mean and include the feminine and vice versa.')}</p>

        </div>
      </div>
      <div className='buttons pure-u-1 pure-u-sm-1 pure-u-md-22-24 pure-u-lg-15-24 pure-xl-15-24 d-flex flex-row flex-h-between'>
        <a href='/'><button type='button' className='refuse shadow'>{t('Refuse')}</button></a>
        <a><button type='button' className='accept shadow' onClick={() => dispatch(setTerms(true))}>{t('Accept')}</button></a>
      </div>
    </div>
  )
}

export default translate('translations')(connect(s => s)(TermsAndConditions))
