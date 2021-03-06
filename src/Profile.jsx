import React , {Component} from "react";
import './App.css';


class Profile extends Component {

render() {
    let artist = {name : '', followers : {total : ''}, images: [{url:''}], genres : []}
    if(this.props.artist !== null) {
        artist = this.props.artist;
    }


    return(
        <div className="profile">
            <img alt = "th profile" className="profile-image" src={artist.images[0].url}/>
            <div className="profile-info">
            <div className="profile-name">{artist.name}</div>
            <div className="profile-followers">{artist.followers.total} Followers</div>
            <div className="profile-genres">

                {artist.genres.map((genre,k)=> {
                    return (
                        <span className="theindi" key = {k}> {genre} </span>
                    )
                })
                }
                
            </div>
            </div>
        </div>
    )
}

}

export default Profile;