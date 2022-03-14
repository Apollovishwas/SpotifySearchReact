import React, {Component} from "react";
import { Button } from "react-bootstrap";
import './App.css';
import {FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import Profile from "./Profile.jsx";
import Gallery from "./Gallery";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query : '',
            artist : null,
            tracks : null
        }
    }

    search() {
        let BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        fetch(FETCH_URL, { method: 'GET',
         headers: { 'Authorization': 'Bearer *' } }) 
         .then( response => response.json()) 
         .then(json => {
             const artist = json.artists.items[0];
             this.setState({artist});
             console.log(this.state.artist);
             FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=CA&`;
             fetch(FETCH_URL, {method : 'GET', headers : {'Authorization': 'Bearer *'}})
             .then(response => response.json()).then(json => {
                 console.log(json);
                 const tracks = json.tracks;
                 this.setState({tracks : tracks});
             })
         });
      
    }
    render() {
        return(
          <div className="App">
              <div className="App-title">The Music Master App</div>
              
              <FormGroup>
                  <InputGroup>
                  <FormControl type = 'text' placeholder="Search" value = {this.state.query} onChange = {event => {this.setState({query : event.target.value})}}/>
                 <Button onClick = {() => this.search()} >
                  <FontAwesome name = 'search'/> Search </Button>

            
                  
                  </InputGroup>
              </FormGroup>
              {
                  this.state.artist !== null ?
                  <div>
 <Profile artist = {this.state.artist}/>
 <div className="gallery">
<Gallery tracks = {this.state.tracks}/>
</div>
</div>
: <div></div>
              }
             
          </div>  
        )
    }
}

export default App