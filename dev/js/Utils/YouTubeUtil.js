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
         console.log("Auth 2 Loaded")
         gapi.auth2.init({"client_id": Constants.CLIENT_ID}).then(() => {
            console.log("Auth 2 Initialized")
            YoutubeUtilities.initPlayer()
         });
      });
   },

   // Initialize YT player
   initPlayer: function() {
      gapi.load('client', function() {
         console.log("gapi.client loaded")
         gapi.client.load('youtube', 'v3', () => {
            console.log('youtube v3 loaded')
         })
      });
   },

   signInHandler: function() {
      return gapi.auth2.getAuthInstance().signIn();
   },

   signOutHandler: function() {
      var authInstance = gapi.auth2.getAuthInstance()
      authInstance.signOut().then(function() {
         console.log("sign out successful");
      })
   },

   getBasicProfile() {
      var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();

      return {
         fullName: profile.getName(),
         givenName: profile.getGivenName(),
         familyName: profile.getFamilyName(),
         imageUrl: profile.getImageUrl(),
         email: profile.getEmail()
      }
   }
}

module.exports = YoutubeUtilities
