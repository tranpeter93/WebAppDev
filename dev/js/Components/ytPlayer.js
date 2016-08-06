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

   _onChange: function() {
      this.setState(YoutubeStore.get());
      // console.log("===Changed State=== ", this.state);
   },

   render: function() {
      return (
         <div className="container-fluid" style={{paddingLeft: "0px", margin: "0px"}}>
            <YTComponents.SideBar />
            <div className="text-center" style={{paddingTop: "10px"}}>
               <YTComponents.Player id={this.state.activeListId}/>
            </div>
         </div>
      )
   }
})

exports.YTPlayer = YTPlaylist;
