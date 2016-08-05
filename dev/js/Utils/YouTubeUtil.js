var Constants = require("../Constants/YoutubeConstants")
var AppDispatcher = require("../Dispatcher/AppDispatcher")


var YoutubeUtilities = {

   // Retrieves Youtube data
   // @resource STRING refer to YoutubeConstants
   // @params JSON
   get: function(resourceType, parameters) {
      console.log("GET: ", resourceType, parameters)
      var data = {
         path: "https://www.googleapis.com/youtube/v3/" + resourceType,
         method: "GET",
         params: parameters
      };

      return gapi.client.request(data)
   },

   // Authenticates user
   auth: function() {
      gapi.load("auth2", function() {
         gapi.auth2.init({"client_id": Constants.CLIENT_ID}).then(() => {
            YoutubeUtilities.initPlayer()
         });
      });
   },

   initPlayer: function() {
      gapi.load('client', function() {
         gapi.client.load('youtube', 'v3')
            // .catch(function(err) {
            //    console.log("Load YoutubeV3 Error: " + err);
            // });
      });
   },

   signInHandler: function() {
      var params;

      gapi.auth2.getAuthInstance().signIn()
         .then(function() {
            require("../Actions/youtubeAction").getChannels()
         })

         // .catch(function(err) {
         //    console.log("Authentication Error: " + err);
         // });
   },

   signOutHandler: function() {
      gapi.auth2.getAuthInstance().signOut()
         .then(function() {
            console.log("Sign Out Success");
         })

         // .catch(function(err) {
         //    console.log("Sign out Error: " + err);
         // });
   }
}

module.exports = YoutubeUtilities
