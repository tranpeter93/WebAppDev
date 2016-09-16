var React = require("react")
var YoutubeAction = require("../Actions/youtubeAction")

var YTComponents = {

   SideBar: React.createClass({
      render: function() {
         return (
            <div id="sidebar" className="col-xs-3 col-md-2">
               <ul id="sidebar-container">
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
                     <div>
                        <div>
                           <span className="glyphicon glyphicon-book"></span>
                           <a className="sidebar-section-header" href="/channels">Channels</a>
                        </div>
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
                        <div>
                           <span className="glyphicon glyphicon-list"></span>
                           <a className="sidebar-section-header" href="/playlists">Playlists</a>
                        </div>
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
         YoutubeAction.search(this.refs.userSearch.value);
         YoutubeAction.toggleSearch(true);
      },

      render: function() {

         return (
            <div id="search-box">
               <form className="form-inline">
                  <div className="input-group">
                     <input type="text" ref="userSearch" placeholder="Username" className='form-control' style={{border: "none", borderRadius: "0px"}}></input>
                     <span className="input-group-btn" style={{backgroundColor: "white"}}>
                        <button type="button" className="btn" onClick={this.search}
                           style={{backgroundColor: "white", border: "none"}}>
                           <span className="glyphicon glyphicon-search" style={{color: "black"}}></span>
                        </button>
                     </span>
                  </div>
               </form>
            </div>
         )
      }
   }),

   SearchResult: React.createClass({
      close: function() {
         YoutubeAction.toggleSearch(false);
      },

      render: function() {
         return (
            <div id="search-result" className={(this.props.isVisible ? "show" : "hide") + " panel col-sm-3"}>
               <div style={{textAlign: "right", marginTop: "12px"}}>
                  <a className="btn glyphicon glyphicon-remove"
                     style={{border: "1px #337ab7 solid"}}
                     onClick={this.close}>
                  </a>
               </div>
               <div className="content-header">Search Results</div>
               <ul id="search-result-list">
                  <li className="btn">{this.props.items}</li>
               </ul>
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
            <button id="login-box" className="btn btn-sm btn-primary-outline"
               onClick={this.props.isSignedIn ? YoutubeAction.signOut : YoutubeAction.signIn}>
               {this.props.isSignedIn ? "Sign-Out" : "Sign-In"}
            </button>
         )
      }
   }),

   Library: React.createClass({

      render: function() {

         // <img src={item.snippet.thumbnails && item.snippet.thumbnails.default.url} height="24px"></img>
         return (
            <div className="col-xs-8 col-md-8">
               <div className="content-header">
                  <span>Library</span>
               </div>
               <ul>
                  {this.props.items.map(function(item) {
                     return (
                        <li className="row" style={{listStyleType: "none"}}>
                           <div key={item.snippet.position}>
                              <div>
                                 <a style={{marginRight: "12px"}} className="btn glyphicon glyphicon-play-circle" href={"/" + item.snippet.id}></a>
                                 <span style={{color: "white"}}>{item.snippet.title}</span>
                              </div>
                           </div>
                        </li>
                     )
                  })}
               </ul>
            </div>
         )
      }
   }),

   ViewBox: React.createClass({
      render: function() {
         return (
            <div className="view-group">
               <div>
                  <span className="glyphicon glyphicon-th view--group-option"></span>
                  <span className="glyphicon glyphicon-th-large view-group-option"></span>
                  <span className="glyphicon glyphicon-th-list view-group-option"></span>
               </div>
            </div>
         )
      }
   })
}

module.exports = YTComponents
