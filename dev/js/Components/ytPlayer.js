var React = require("react");
var YoutubeAction = require("../Actions/youtubeAction")
var YoutubeStore = require("../Stores/youtubeStore")
var YoutubeConstants = require("../Constants/YoutubeConstants")
var YoutubeBox = require("./YoutubeBox")

var YTPlaylist = React.createClass({

   getInitialState: function() {
      var initState = YoutubeStore.get()
      console.log("===Initial State=== ", initState)
      return initState
   },

   componentDidMount: function() {
      YoutubeAction.auth();
      YoutubeStore.addChangeListener(YoutubeConstants.CHANGE, this._onChange);
   },

   componentWillUnmount: function() {
      YoutubeAction.deauth();
      YoutubeStore.removeChangeListener(YoutubeConstants.CHANGE, this._onChange);
   },

   _onChange: function() {
      this.setState(YoutubeStore.get());
      console.log("===Changed State=== ", this.state);
   },

   render: function() {
      return (
         <div>
            <div id="content" className="container-fluid text-center">
               <h1>YT Player</h1>
               <p>YT playlist</p>
               <div>
                  <button className="btn btn-primary-outline"
                     onClick={this.state.isSignedIn ? YoutubeAction.signOut : YoutubeAction.signIn}>
                     {this.state.isSignedIn ? "Sign-Out" : "Sign-In"}
                  </button>
               </div>
               <div className={this.state.isSignedIn ? "show" : "hide"}>
                  <div id="searchBar">
                     <form>
                        <div className="input-group">
                           <input type="text" placeholder="Username" className='form-control'></input>
                           <button type="submit">Search</button>
                        </div>
                     </form>
                  </div>
                  <div className={this.state.activeListId ? "show" : "hide"}>
                     <div id="player">
                        <iframe id="ytplayer" type="text/html"
                           width="640" height="390"
                           src={"https://www.youtube.com/embed?listType=playlist&list="
                            + this.state.activeListId}
                           frameborder="0">
                        </iframe>
                     </div>
                  </div>
                  <div id="playlist-container">
                     <YoutubeBox title="Channels" data={this.state.channels} type={YoutubeConstants.RESC.CHANNELS}/>
                     <YoutubeBox title="Playlists" data={this.state.playlists} type={YoutubeConstants.RESC.PLAYLISTS} handler={YoutubeAction.getPlaylists}/>
                  </div>
               </div>
            </div>
         </div>
      )
   }
})

exports.YTPlayer = YTPlaylist;
