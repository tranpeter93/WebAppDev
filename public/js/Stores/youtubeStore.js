var AppDispatcher = require("../Dispatcher/AppDispatcher")
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var YoutubeConstants = require("../Constants/YoutubeConstants")

var user = {
      // username: "",
      isSignedIn: false,
      channels: [],
      playlists: [],
      playlistItems: [],
      searchResult: {
         data: "",
         isVisible: false
      }
}

var set = function(resourceType, data) {
   user[resourceType] = data;
}

var search = function(resourceType, id) {
   return user[resourceType].find(function (resc) {
      return resc["id"] = id;
   });
}

var YoutubeStore = assign({}, EventEmitter.prototype, {

   get: function() {
      return user;
   },

   emitChange: function() {
      this.emit(YoutubeConstants.CHANGE);
   },

   addChangeListener: function(actionType, cb) {
      this.on(actionType, cb);
   },

   removeChangeListener: function(actionType, cb) {
      this.removeListener(actionType, cb);
   },

   dispatcherIndex: AppDispatcher.register(function(payload) {
      var action = payload.action;

      switch(action.actionType) {
         case YoutubeConstants.RESC.PLAYLISTS:
            set(action.actionType, action.data);
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.RESC.PLAYLISTITEMS:
            set(action.actionType, action.data);
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.RESC.CHANNELS:
            set(action.actionType, action.data);
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.SIGN_IN:
            user.isSignedIn = action.data
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.PROFILE:
            user.profile = action.data;
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.SEARCH_USERNAME:
            user.searchResult.data = action.data;
            YoutubeStore.emitChange();
            break;

         case YoutubeConstants.SEARCH_TOGGLE:
            user.searchResult.isVisible = action.data;
            YoutubeStore.emitChange();
            break;
      }

      return true; // No errors. Needed by promise in dispatcher
   })
})

module.exports = YoutubeStore;
