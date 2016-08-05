var AppDispatcher = require("../Dispatcher/AppDispatcher")
var MongoUtil = require("../Utils/MongoDBUtil").MongoDB

var MongoAction = {
   connect: function() {
      // MongoUtil.connect();
   },

   disconnect: function() {
      // MongoUtil.disconnect();
   },

   select: function() {
      //TODO
   },

   delete: function() {
      //TODO
   },

   update: function() {
      //TODO
   }
}

module.exports = MongoAction
