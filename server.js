var express = require('express')
var app = express()
// var db = require('./db')
var MongoClient = require("mongodb").MongoClient,
    Db = require("mongodb").Db,
    Server = require("mongodb").Server

app.set('port', (process.env.PORT || 8080));

var serverInstance = new Server('localhost', 27017, {auto_reconnect: true});
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  if(!err) {
     console.log("Connected succesfully to server");
     db.close();
  }
  else {
     console.log("error!@#")     
  }
});

app.use(express.static(__dirname + '/public'));

app.get('/playlists', function(req, res) {
   res.send("[Playlist] JSON GET request")
})

app.get('/forecast', function(req, res) {
   res.send('[Forecast] JSON GET request')
})

app.get('/data/user', function(req, res) {
   res.send({
      "user": "foo"
   })
})

var server = app.listen(app.get('port'), () => {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
   console.log("App listening on port " + app.get("port"));
})
