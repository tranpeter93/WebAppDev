var $ = require("jQuery")
var React = require("react")
var ReactDOM = require("react-dom")

/**Components**/
var Landing = require("./Components/landing").Landing
var Navbar = require("./Components/navbar").Navbar
var Forecast = require("./Components/forecast").Forecast
var YTPlayer = require('./Components/ytPlayer').YTPlayer

var MainStore = require("./Stores/mainStore")
var MainConstants = require("./Constants/MainConstants")

//ROUTER
var Router = require("react-router").Router
var Route = require("react-router").Route
var browserHistory = require("react-router").browserHistory

var App = React.createClass({

   componentDidMount: function() {
      MainStore.addChangeListener(this._onChange);
   },

   componentWillUnmount: function() {
      MainStore.removeChangeListener(this._onChange);
   },

   _onChange: function() {
      this.setState({_currentPage: MainStore.get()});
   },

   getInitialState: function() {
      return {_currentPage: MainStore.get()}
   },

   render: function() {

      return (
         <div>
            <Navbar />
            <div>
            {(() => {
               switch(this.state._currentPage) {
                 case MainConstants.PAGES["FORECAST"]: return <Forecast />;
                 case MainConstants.PAGES["LANDING"]: return <Landing />;
                 case MainConstants.PAGES["YTPLAYER"]: return <YTPlayer />
                 default: return <Landing />;
               }
              })()}
            </div>
         </div>
      )
   }
})

ReactDOM.render((
   <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
   </Router>
), document.getElementById("container"))
