var AppDispatcher = require("../Dispatcher/AppDispatcher")
var YoutubeUtil = require("../Utils/YouTubeUtil")
var YoutubeConstants = require("../Constants/YoutubeConstants")

var YoutubeAction = {

   auth: function() {
      YoutubeUtil.auth()
   },

   deauth: function() {
      //TODO: Implement
   },

   signIn: function() {
      YoutubeUtil.signInHandler();
      AppDispatcher.handleViewAction({
         actionType: YoutubeConstants.SIGN_IN,
         data: true
      });
   },

   signOut: function() {
      YoutubeUtil.signOutHandler();
      AppDispatcher.handleViewAction({
         actionType: YoutubeConstants.SIGN_IN,
         data: false
      });
   },

   setActive: function(item, resourceType) {
      //TODO: Implement
   },

   update: function(item, resourceType) {
      console.log("===Update: Dispatch===\n", resourceType, item)
      AppDispatcher.handleDataAction({
         actionType: resourceType,
         data: item
      });
   },

   /**
    * Relevant-Filters:
    *  forUsername::String, id::String, mine::boolean
    * Optional Params:
    *  maxResults::uInt, pageToken::String
    */
   getChannels: function() {
      var resourceType = YoutubeConstants.RESC.CHANNELS;
      var request = YoutubeUtil.get(resourceType, {part: "snippet", mine: true});
      var req = request.execute(function(resp) {
         if (!resp.items || !resp.items.length) return;

         YoutubeAction.update(resp.items, resourceType);
      })
   },

   /**
    * Relevant-Filters:
    *  channelId::String, id::String, mine::boolean
    * Optional Params:
    *  maxResults::uInt, pageToken::String
    **/
   getPlaylists: function() {
      var resourceType = YoutubeConstants.RESC.PLAYLISTS;
      var request = YoutubeUtil.get(resourceType, {part: "snippet", mine: true});
      var req = request.execute((resp) => {
         if (!resp.items || !resp.items.length) return;

         YoutubeAction.update(resp.items, resourceType)
      });
   },

   /**
    * Relevant-Filters:
    *  id::String, playlistId::String
    * Optional Params:
    *  maxResults::uInt, pageToken::String, videoId::String
    **/
   getPlaylistItems: function(params) {
      var resourceType = YoutubeConstants.RESC.PLAYLISTITEMS;
      var request = YoutubeUtil.get(resourceType, params);
      var req = request.execute((resp) => {
         if (!resp.items || !resp.items.length) return;
         YoutubeAction.update(resp.items, resourceType)
      });
   }
}

module.exports = YoutubeAction
