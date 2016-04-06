var express = require('express'),
    http = require('http');
var app = express();
var dbOperations = require('./database.js');


// serve static files
app.use(express.static('public'));

// route database operations
app.get('/db/getResults', function(req,res){
  dbOperations.getResults(req,res);
});
app.get('/db/addResult', function(req,res){
  dbOperations.addResult(req,res);
});
app.get('/db/delResults', function(req,res){
  dbOperations.delResults(req,res);
});

//start server
app.listen(process.env.PORT || 5000);

