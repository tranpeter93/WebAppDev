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
      YoutubeUtil.signInHandler().then(
         (resp) => {
            console.log("Login successful.");
            var profile = YoutubeUtil.getBasicProfile()
            console.log("profile: ", profile);
            YoutubeAction.update(YoutubeConstants.PROFILE, profile);
            YoutubeAction.update(YoutubeConstants.SIGN_IN, true);
         },
         (err) => {
            console.log("Encountered an error logging in.");
         }
      );
   },

   signOut: function() {
      YoutubeUtil.signOutHandler().then((resp) => {
         YoutubeAction.update(YoutubeConstants.SIGN_IN, false);
      })
   },

   update: function(item, resourceType) {
      AppDispatcher.handleDataAction({
         actionType: resourceType,
         data: item
      });

      return new Promise(function(resolve, reject) {
         resolve(item)
      })
   },

   search(username) {
      var arr = [];

      this.getChannels(username)
      .then((resp) => {
         resp.result.items.map((item) => {
            this.getPlaylists(item.id)
            .then((resp) => {
               resp.result.items.map((item) => {
                  arr.push(item.snippet.title)
               })

               this.update(arr.join(), YoutubeConstants.SEARCH_USERNAME)
            })
         })


      })
   },

   toggleSearch(val) {
      this.update(val, YoutubeConstants.SEARCH_TOGGLE);
   },

   getChannels: function(username) {
      var resourceType = YoutubeConstants.RESC.CHANNELS;
      var params = {part: "snippet", forUsername: username}

      return YoutubeUtil.get(resourceType, params)
      .then(function(resp) {

         return new Promise((resolve, reject) => {
            resolve(resp)
         })
      })
   },

   getPlaylists: function(ch_id) {
      var resourceType = YoutubeConstants.RESC.PLAYLISTS;
      var params = {part: "snippet", channelId: ch_id}

      return YoutubeUtil.get(resourceType, params)
      .then((resp) => {

         return new Promise((resolve, reject) => {
            resolve(resp)
         })
      })
   },

   getPlaylistItems: function(params) {
      var resourceType = YoutubeConstants.RESC.PLAYLISTITEMS;
      YoutubeUtil.get(resourceType, params)
      .then((resp) => {
         // YoutubeAction.update(resp.result.items, resourceType)

         return new Promise((resolve, reject) => {
            resolve(resp)
         })
      });
   },

   getVideos: function(params) {
      var resourceType = YoutubeConstants.RESC.VIDEOS;
      YoutubeUtil.get(resourceType, params)
      .then((resp) => {
         // YoutubeAction.update(resp.result.items, resourceType)

         return new Promise((resolve, reject) => {
            resolve(resp)
         })
      })
   }
}

module.exports = YoutubeAction
