var React = require("react");
var YoutubeAction = require("../Actions/youtubeAction")
var YoutubeStore = require("../Stores/youtubeStore")
var YoutubeConstants = require("../Constants/YoutubeConstants")
var YTComponents = require("./ytComponents")

var YTPlaylist = React.createClass({

   getInitialState: function() {
      return YoutubeStore.get()
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
      if (prevState.playlists !== this.state.playlists) {
         YoutubeAction.getPlaylistItems({
            part: "snippet",
            playlistId: this.state.playlists[0].id,
            maxResults: 50
         });
      }
   },

   _onChange: function() {
      this.setState(YoutubeStore.get());
      console.log(YoutubeStore.get())
   },

   render: function() {
      // <YTComponents.ViewBox />
      return (
         <div className="content-container">
            <YTComponents.SideBar isSignedIn={this.state.isSignedIn} channels={this.state.channels} playlists={this.state.playlists}/>
            <YTComponents.SearchResult items={this.state.searchResult.data} isVisible={this.state.searchResult.isVisible}/>               
            <YTComponents.Library items={this.state.playlistItems} />
         </div>
      )
   }
})

exports.YTPlayer = YTPlaylist;
