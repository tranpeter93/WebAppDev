var express = require('express')
var db = require("./db")
var app = express()
var port = 8080


app.use(express.static(__dirname + '/public'));

app.get('/playlists', function(req, res) {
   res.send("[Playlist] JSON GET request")
})

app.get('/forecast', function(req, res) {
   res.send('[Forecast] JSON GET request')
})

app.listen(port, () => {
   console.log("App listening on port " + port);
})
