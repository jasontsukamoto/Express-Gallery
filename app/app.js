var express = require('express');
var app = express();
var db = require('../models');
var gallery = require('./routes/gallery.js');
// db.sequelize.sync();

app.get('/', function(req, res) {
  res.send('herllo');
});


app.get('/new_photo', function(req, res) {
  res.send('new photo');
});


//mounts the middleware function(s) at the path
//  defer all routes matching http://localhost:3000/gallery to module
app.use('/gallery', gallery);



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;


  console.log('Server listening at http://%s:%s', host, port);
});