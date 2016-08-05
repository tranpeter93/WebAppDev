var AppDispatcher = require("../Dispatcher/AppDispatcher")
var ForecastConstants = require("../Constants/ForecastConstants")
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var $ = require('jquery')

var CHANGE_EVENT = 'change'
var _recentForecast = {list: []}

var update = function(data) {
	_recentForecast = data;
}

var ForecastStore  = assign({}, EventEmitter.prototype, {
	
	get: function() {
		return _recentForecast;
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
			case ForecastConstants.FORECAST_UPDATE: 
				update(action.data)
				ForecastStore.emitChange();
				break;
		}
		
		return true; // No errors. Needed by promise in dispatcher
	})
})

module.exports = ForecastStore;