var AppDispatcher = require("../Dispatcher/AppDispatcher")
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var MainConstants = require("../Constants/MainConstants")

var CHANGE_EVENT = 'change'
var _currentPage = MainConstants.PAGES["YTPLAYER"]

var update = function(data) {
   _currentPage = data;
}

var MainStore = assign({}, EventEmitter.prototype, {

   get: function() {
      return _currentPage
   },

   emitChange: function() {
      this.emit(CHANGE_EVENT);
   },

   addChangeListener: function(cb) {
      this.on(CHANGE_EVENT, cb)
   },

   removeChangeListener: function(cb) {
      this.removeListener(CHANGE_EVENT, cb)
   },

   dispatcherIndex: AppDispatcher.register(function(payload) {
      var action = payload.action;

      switch(action.actionType) {
         case MainConstants.REDIRECT:
            update(action.data)
            MainStore.emitChange();
            break;
      }

      return true; // No errors. Needed by promise in dispatcher
   })
})

module.exports = MainStore;
