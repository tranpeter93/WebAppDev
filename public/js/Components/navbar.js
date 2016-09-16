var React = require("react")
var MainActions = require("../Actions/MainAction")
var MainConstants = require("../Constants/MainConstants")
// var Link = require("react-router").Link

var Navbar = React.createClass({
   landingHandler: function() {
      MainActions.redirect(MainConstants.PAGES["LANDING"]);
   },

   forecastHandler: function() {
      MainActions.redirect(MainConstants.PAGES["FORECAST"]);
   },

   ytPlayerHandler: function() {
      MainActions.redirect(MainConstants.PAGES["YTPLAYER"]);
   },

   render: function() {
      return (
         <nav className="nav navbar navbar-inverse navbar-fixed-top">
            <ul className="nav navbar-nav">
               <a href="#" onClick={this.landingHandler} className="nav nav-link navbar-brand">Hello World</a>
               <li className="dropdown">
                  <a className="dropdown-toggle nav nav-link" type="button" id="dropdownMenu1" data-toggle="dropdown">
                     Projects</a>

                  <ul className="dropdown-menu">
                     <li><a href="#" onClick={this.forecastHandler}>Forecast</a></li>
                     <li><a>YouTube Playlist</a></li>
                  </ul>
               </li>
            </ul>
         </nav>
   )}
})

exports.Navbar = Navbar
