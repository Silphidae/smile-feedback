var express = require('express');
var app = express();

//app.get('/', function(req, res) {
//  res.render('index.html');
//});

app.use(express.static('public'));


// set 404 page
app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, 'Page cannot be found!');
});

//start server
app.listen(3000);