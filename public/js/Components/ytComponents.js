var React = require("react")
var YoutubeAction = require("../Actions/youtubeAction")
// var YoutubeStore = require("../Stores/youtubeStore")

var YTComponents = {

   SideBar: React.createClass({
      shouldComponentUpdate: function(nextProps, nextState) {
         return nextProps !== this.props
      },

      render: function() {
         return (
            <div id="sidebar" className="col-xs-2">
               <ul className="sidebar-container">
                  <li className="sidebar-section">
                     <YTComponents.SearchBox />
                  </li>

                  <li className="sidebar-section">
                     <div id="sidebar-ytLabel">
                        <label><strong>YouTube</strong></label>
                        <span><YTComponents.LoginBox isSignedIn={this.props.isSignedIn}/></span>
                     </div>
                  </li>

                  <li className="sidebar-section">
                     <div style={{color: "#2AAAAA"}}>
                        <a className="sidebar-section-header" href="/channels">Channels</a>
                        <ul style={{padding: "0px"}}>
                           {this.props.channels.map(function(item) {
                              return (
                                 <li key={item.id} style={{listStyleType: "none"}}>
                                    <a href="#" className="btn">
                                       <span className="glyphicon glyphicon-menu-hamburger" style={{paddingLeft: "6px"}}></span>
                                       <span style={{paddingLeft: "6px"}}>{item.snippet.title}</span>
                                    </a>
                                 </li>
                              )
                           })}
                        </ul>
                     </div>
                  </li>

                  <li className="sidebar-section">
                     <div>
                        <a className="sidebar-section-header" href="/playlists">Playlists</a>
                        <ul style={{padding: "0px"}}>
                           {this.props.playlists.map(function(item) {
                              return (
                                 <li key={item.id} style={{listStyleType: "none"}}>
                                    <a href="#" className="btn">
                                       <span className="glyphicon glyphicon-menu-hamburger" style={{paddingLeft: "6px"}}></span>
                                       <span style={{paddingLeft: "6px"}}>{item.snippet.title}</span>
                                    </a>
                                 </li>
                              )
                           })}
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>
         )
      }
   }),

   SearchBox: React.createClass({
      search: function () {

      },

      render: function() {
         return (
            <div id="search-box">
               <form className="form-inline">
                  <div className="input-group">
                     <input type="text" placeholder="Username" className='form-control' style={{border: "none", borderRadius: "0px"}}></input>
                     <span className="input-group-btn" style={{backgroundColor: "white"}}>
                        <button type="submit" className="btn btn-success" style={{backgroundColor: "white", border: "none"}}>
                           <span className="glyphicon glyphicon-search" style={{color: "black"}}></span>
                        </button>
                     </span>
                  </div>
               </form>
            </div>
         )
      }
   }),

   Player: React.createClass({
      render: function() {
         return (
            <div className={this.props.id ? "show" : "hide"}>
               <div id="player">
                  <iframe id="ytplayer" type="text/html"
                     src={"https://www.youtube.com/embed?listType=playlist&list="
                      + this.props.id}
                     frameborder="0" style={{border: "0px"}}>
                  </iframe>
               </div>
            </div>
         )
      }
   }),

   LoginBox: React.createClass({
      render: function() {
         return (
            <button className="btn btn-sm btn-primary-outline"
               style={{backgroundColor: "red", color: "white", marginLeft: "5px"}}
               onClick={this.props.isSignedIn ? YoutubeAction.signOut : YoutubeAction.signIn}>
               {this.props.isSignedIn ? "Sign-Out" : "Sign-In"}
            </button>
         )
      }
   }),

   YoutubeBox: React.createClass({
      render: function() {
         return (
            <div>
               <button className="btn btn-info" onClick={this.props.handler}>{this.props.title}</button>
               <div className={(this.props.data && this.props.data.length) ? "show" : "hide" }>
                  <ul>
                     {this.props.data.map((item) => {
                        return (
                           <span key={item.id}>
                              <button className="btn btn-default">{item.snippet.title}</button>
                           </span>
                        )
                     })}
                  </ul>
               </div>
            </div>
         )
      }
   }),

   Library: React.createClass({

      render: function() {
         return (
            <div className="row">
               <div style={{marginBottom: "20px", textAlign: "left", color: "#123456", fontSize: "32px", borderBottom: "2px #123456 solid"}}>Library</div>
               {this.props.items.map(function(item) {
                  return (
                     <div key={item.snippet.position}
                        className="thumbnail col-sm-2 col-md-1"
                        style={{float: "left", marginRight: "10px", marginLeft: "10px", height:"80px", borderRadius: "0px", backgroundColor: "#123456", borderColor: "#000000"}}>
                        <img src={item.snippet.thumbnails && item.snippet.thumbnails.default.url}></img>
                     </div>
                  )
                  })
               }
            </div>
         )
      }
   })


}

module.exports = YTComponents
