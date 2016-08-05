var React = require("react")
var YoutubeAction = require("../Actions/youtubeAction")

var YoutubeBox = React.createClass({
   render: function() {
      return (
         <div>
            <button className="btn btn-info" onClick={this.props.handler}>{this.props.title}</button>
            <div className={(this.props.data && this.props.data.length) ? "show" : "hide" }>
               <ul>
                  {this.props.data.map(function(item) {
                     console.log("Box: ", item)
                     return <li key={item.id}><button>{item.snippet.title}</button></li>
                  })}
               </ul>
            </div>
         </div>
      )
   }
});

module.exports = YoutubeBox
