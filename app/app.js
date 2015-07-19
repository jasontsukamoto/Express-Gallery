var express = require('express');
var app = express();
var db = require('../models');
var gallery = require('./routes/gallery.js');
var bodyParser = require('body-parser');
var User = db.User;
db.sequelize.sync();
// --- modules ^^^

//tell express which template engine we using by npm module name
app.set('view engine', 'jade');
//tell express where our template file lives
app.set('views', '../views');

// --- app settings ^^^

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// --- middleware ^^^


app.get('/', function(req, res) {
  db.Picture.findAll().then(function(pictures) {
    console.log(pictures);
    res.render('contact.jade', { pictures : pictures });
  });

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