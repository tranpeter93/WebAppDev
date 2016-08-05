var ForecastConstants = require('../constants/ForecastConstants')
var AppDispatcher = require("../Dispatcher/AppDispatcher")

var ForecastActions = {
	update: function(data) {
		AppDispatcher.handleViewAction({
			actionType: ForecastConstants.FORECAST_UPDATE,
			data: data
		})
	}
}

module.exports = ForecastActions