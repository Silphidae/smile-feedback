var express = require('express');
var app = express();

// serve static files
app.use(express.static('public'));

// set 404 page
app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page cannot be found!');
});


//start server
app.listen(process.env.PORT || 5000);
