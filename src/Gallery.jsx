import React, {Component} from "react";
import './App.css'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingURL : '',
            audio:null,
            playing:false
        }
    }


    playAudio(previewURL){
        let audio = new Audio(previewURL);
       
        if(!this.state.playing){
            audio.play()
            this.setState({
                playing:true,
                playingURL:previewURL,
                audio : audio
            })
        }

        else {
            if(this.state.playingURL === previewURL) {
                this.state.audio.pause();
                this.setState({
                    playing:false
                })
            }
            else {
                this.state.audio.pause();
                audio.play()
                this.setState({
                    playing:true,
                    playingURL:previewURL,
                    audio: audio
                    
                })
            }
        }

    }


   render() {
       if(this.props.tracks !== null) {
       console.log(this.props.tracks)
       const tracks = this.props.tracks;
       return (
        <div>

            {
            
            tracks.map((track, k) => {
                const trackImg = track.album.images[0].url;
                return(
                    <div key ={k} onClick={()=>this.playAudio(track.preview_url)} className = "track">
                        <img src = {trackImg} alt = 'trackImage' className = "track-image"/>
                        <div className="track-play">
                            <div class = "track-play-inner">
                            
                                {
                                    this.state.playingURL ===track.preview_url 
                                    ? <span>| |</span>
                                    : <span>&#9654;</span>
                                }
                              
                                </div>
                            </div>
                        <p className="track-name">{track.name}</p>
                    </div>
                )
            })}
        </div>  
      )
       }
       else {
           return(
           <div></div>)
       }
     
   }
}

export default Gallery