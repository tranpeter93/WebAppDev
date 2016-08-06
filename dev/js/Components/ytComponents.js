var React = require("react")
var YoutubeAction = require("../Actions/youtubeAction")

var YTComponents = {

   SideBar: React.createClass({
      render: function() {
         return (
            <div id="sidebar" className="col-xs-2" style={{backgroundColor: "#111111", height: "100vh", paddingTop: "10px", marginBot: "10px"}}>
               <YTComponents.SearchBox />
               <div className="row">
                  <div>
                     <label><strong style={{color: "red"}}>YouTube</strong></label>
                     <span><YTComponents.LoginBox /></span>
                  </div>
                  <ul className="nav nav-pills nav-stacked" style={{color: "#2AAAAA"}}>
                     <li><a href="/channels" style={{borderRadius: "0px"}}>Channels</a></li>
                     <li><a href="/playlists" style={{borderRadius: "0px"}}>Playlists</a></li>
                  </ul>
               </div>
            </div>
         )
      }
   }),

   SearchBox: React.createClass({
      render: function() {
         return (
            <div id="searchBar" className="row" style={{marginBottom: "50px"}}>
               <form className="form-inline">
                  <div className="input-group">
                     <input type="text" placeholder="Username" className='form-control'></input>
                     <span className="input-group-btn">
                        <button type="submit" className="btn btn-success">
                           <span className="glyphicon glyphicon-search"></span>
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
   })
}

module.exports = YTComponents
