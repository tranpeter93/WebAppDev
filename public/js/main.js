var $ = require("jQuery")
var React = require("react")
var ReactDOM = require("react-dom")
var Landing = require("./Components/landing").Landing
var Navbar = require("./Components/navbar").Navbar
var Forecast = require("./Components/forecast").Forecast
var YTPlayer = require('./Components/ytPlayer').YTPlayer

var MainStore = require("./Stores/mainStore")
var MainConstants = require("./Constants/MainConstants")

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

ReactDOM.render(<App />, document.getElementById("container"))
