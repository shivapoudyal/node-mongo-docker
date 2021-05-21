var mongoose = require('mongoose');
var dotenv = require('dotenv'); //for db env
var express = require('express');
var router = express.Router();
var myModel = require('./models/shivaSchema');

dotenv.config({path: './db.env'})

// Connecting to database (db.env - process.env.database, this is db.env database access name)
var database = process.env.database;


const db = (database);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
	if (error) {
		console.log("Error!" + error);
	}
});

module.exports = router;


router.get('/findall', function(req, res) {
  myModel.find(function(err, data) {
      if(err){
          console.log("query errrrrrrrrrrrrr="+ err);
      }
      else{
          res.send(data);
      }
  });  
});
