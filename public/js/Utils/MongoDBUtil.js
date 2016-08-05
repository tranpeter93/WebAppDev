// var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:8080';
var database;

var MongoDB ={
   // connect: MongoClient.connect(url, function(err, db) {
   //    if (err != null) {
   //       console.log("Unsuccessful connection attempt to mongoDB server");
   //    }
   //
   //    console.log("Connect successfully to mongoDB server");
   //    database = db;
   // }),
   //
   // disconnect: function() {
   //    database.close();
   // }
}

module.exports = MongoDB
