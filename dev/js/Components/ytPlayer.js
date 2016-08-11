var React = require("react");
var YoutubeAction = require("../Actions/youtubeAction")
var YoutubeStore = require("../Stores/youtubeStore")
var YoutubeConstants = require("../Constants/YoutubeConstants")
var YTComponents = require("./ytComponents")

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

   componentDidUpdate: function(prevProps, prevState) {
      console.log("***changed state***")
      var playlistItems = this.state.playlistItems
      if (prevState.playlists !== this.state.playlists) {
         YoutubeAction.getPlaylistItems({
            part: "snippet",
            playlistId: this.state.playlists[0].id, //this.state.playlists.items[0].id,
            maxResults: 50
         });
      }
   },

   _onChange: function() {
      this.setState(YoutubeStore.get());
      console.log("===Changed State=== ", this.state);
   },

   render: function() {
      // <YTComponents.Library items={this.state.playlistItems} />

      return (
         <div className="container-fluid" style={{paddingLeft: "0px", margin: "0px", backgroundColor: "#000000"}}>
            <YTComponents.SideBar isSignedIn={this.state.isSignedIn} channels={this.state.channels} playlists={this.state.playlists}/>
            <div className="text-center" style={{paddingTop: "10px"}}>
               <YTComponents.Library items={this.state.playlistItems} />
            </div>
         </div>
      )
   }
})

exports.YTPlayer = YTPlaylist;
