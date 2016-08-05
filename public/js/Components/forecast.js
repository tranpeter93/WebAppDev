var $ = require('jquery')
var React = require("react")

var ForecastStore = require("../stores/forecastStore")
var ForecastAction = require("../actions/forecastAction")
var Constants = require('../../asset/constants').Constants
var WEATHER = require('../constants/ForecastConstants').WEATHER
var DAY = require('../constants/ForecastConstants').DAY

var getForecast = function() {
   //api.openweathermap.org/data/2.5/forecast?id=5392171&APPID=e29e34a3096234cab96787a851972ec0&units=imperial
}

var getDayDiff =  function(recentForecast) {
   var milliDiff = Math.abs(new Date().getTime() - recentForecast);
   var dayDiff = milliDiff / (1000 * 60 * 60 * 24)		//ms * (1 sec/1000 ms) * (1 min/60 sec) * (1 hour/60 min) * (1 day/24 hrs)

   return dayDiff;
}

var DailyForecast = React.createClass({
   render: function() {
      var dayIdx = (this.props.date.getDay() + this.props.idx) % 7

      return (
         <div className='col-sm-2'>
            <h4>{DAY[dayIdx]}</h4>
            <img src={'./assets/' + WEATHER[this.props.data.weather[0].main] + '.png'}></img>
            <h3>{Math.round(this.props.data.main.temp) + "\xB0"}</h3>
         </div>
      )
   }
})

var Forecast = React.createClass({
   getJSON: function(url) {
      $.getJSON(url).then(function(data) {
         var shortList = data.list.slice(0, 6)
         var newData = {
            list: shortList,
            name: data.city.name,
            dateTime: new Date().getTime()
         }

         ForecastAction.update(newData)
      })
   },

   getInitialState: function() {
      console.log("::Initial State::", this.state)
      this.getJSON("../../assets/sanJose.json");

      return ForecastStore.get()
   },

   componentDidMount: function() {
      console.log("::DID MOUNT::")

      ForecastStore.addChangeListener(this._onChange);


       if (!this.state.list ||
         getDayDiff(this.state.dateTime) >= 1) {
         this.getJSON(ForecastConstants.BASE_URL+"?id=5392171&APPID="+ForecastConstants.APP_ID+"&units=imperial");
      }
      else {
         this.getJSON("../../assets/sanJose.json");
      }
   },

   componentWillUnmount: function() {
      ForecastStore.removeChangeListener(this._onChange);
   },

   _onChange: function() {
      this.setState(ForecastStore.get());
   },

   render: function() {
      console.log("::Render::", this.state)

      return (
         <div className="container-fluid" >
            <div className="text-center">
               <h1>Forecast</h1>
               <h4>{this.state.name}</h4>
               <div id="forecast_bar"  className="row">
                  {this.state.list.map(function(result, idx) {
                     return <DailyForecast key={result.dt_txt} data={result} date={new Date()} idx={idx} />
                  })}
               </div>
            </div>
         </div>
      )
   }
})

exports.Forecast = Forecast
