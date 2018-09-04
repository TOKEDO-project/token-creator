import React, { Component } from 'react'
import './YoutubeVideo.css'

export class YoutubeVideo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      height: 0
    }

    this.youtubeVideo = React.createRef()
  }

  componentDidMount () {
    this.calculateAspectRatio()
    window.addEventListener('resize', this.calculateAspectRatio)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.calculateAspectRatio)
  }

 calculateAspectRatio = () => {
   const width = this.youtubeVideo.current.clientWidth
   const height = (9 / 16) * width
   this.setState({ height })
 }

 render () {
   const { className, shadow, id } = this.props
   const { height } = this.state
   return (
     <div className={`youtube-video ${shadow ? 'shadow' : ''} ${className}`} style={{ height }}>
       <iframe ref={this.youtubeVideo} width='100%' height={height} src={`https://www.youtube.com/embed/${id}`} frameborder='0' />
     </div>
   )
 }
}

export default YoutubeVideo
