import React from 'react'
import { translate } from 'react-i18next'
import './Pages.css'
class Credits extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    const { t } = this.props
    return (
      <div id='creditsPage' className='pages pure-u-1 d-flex flex-column flex-v-center'>
        <div className='box shadow pure-u-1 pure-u-md-3-5 pure-u-lg-2-5 pure-xl-2-5'>
          <h4 className='font-size-medium'>{t('Credits')}</h4>
          <span className='font-size-medium'>
            {t('Copyright')} &copy;2018 {t('Tokedo Ltd')}
          </span>
          <div className='text'>
            <p className='font-size-small'>
              {t('Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software"\), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions')} :<br />
              {t('The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.')}
              <br />
              {t('THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.')}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default translate('translations')(Credits)
