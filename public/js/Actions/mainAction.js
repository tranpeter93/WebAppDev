var MainConstants = require("../constants/MainConstants")
var AppDispatcher = require("../Dispatcher/AppDispatcher")

var MainActions = {
	redirect: function(data) {
		AppDispatcher.handleViewAction({
			actionType: MainConstants.REDIRECT,
			data: data
		})
	}
}

module.exports = MainActions