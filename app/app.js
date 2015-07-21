var express = require('express');
var app = express();
var db = require('../models');
var gallery = require('./routes/gallery.js');
var bodyParser = require('body-parser');
var User = db.User;
var methodOverride = require('method-override');
var log = require('morgan');
var path = require('path');
db.sequelize.sync();

// --- modules ^^^

//tell express which template engine we using by npm module name
app.set('view engine', 'jade');

//tell express where our template file lives
app.set('views', path.resolve('views'));

// --- app settings ^^^
app.use(log('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// --- middleware ^^^

//mounts the middleware function(s) at the path
//  defer all routes matching http://localhost:3000/gallery to module
app.use('/gallery', gallery);

app.get('/', function(req, res) {
  db.Picture.findAll().then(function(pictures) {
    res.render('contact', { pictures : pictures });
  });
});

app.get('/new_photo', function(req, res) {
  res.render('newPhoto');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});