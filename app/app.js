var express = require('express');
var app = express();
var db = require('../models');
var gallery = require('./routes/gallery.js');
var bodyParser = require('body-parser');
var User = db.User;
var Picture = db.Picture;
var methodOverride = require('method-override');
var log = require('morgan');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var crypto = require('crypto');
var ensureAuthenticated = require('./lib/auth.js');
var cookieParser = require('cookie-parser');
db.sequelize.sync();
// User.findOrCreate({ where : { id : 1}, defaults : {username: 'admin', password : createHash('nibblers')}});
Picture.findOrCreate({ where : { id : 1 }, defaults : { author : 'admin', link : 'google.com', description : 'http://wallpapersweb.com/data/media/90/Sunrise%20Scenic.jpg', user_id : 1 }});
// --- modules ^^^

//tell express which template engine we using by npm module name
app.set('view engine', 'jade');

//tell express where our template file lives
app.set('views', path.resolve('views'));

// --- app settings ^^^
app.use(log('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUnititalized : true
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('id', id);
  User.findById(id).then(function(user) {
    return done(null, user);
  }).catch(function(err) {
    if (err) return done(err);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // db.Pictures.find({ username : username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message : 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message : 'Incorect password.' });
    //   }
    //   return done(null, user);
    // })

    User.findOne( { username : username }).then(function(user) {
      console.log(user);
      if (!user) {
        console.log('incorrect user');
        return done(null, false, { message: 'Incorrect username'} );
      }
      console.log(createHash(password));
      console.log(user.password);
      // console.log(user);
      if (user.password !== createHash(password)) {
        console.log('incorrect password');
        return done(null, false, { message : 'Incorect password.' });
      }
      console.log('working');
      return done(null, user);
    }).catch(function(err) {
      return done(err);
    });
  })
);

// --- middleware ^^^

//mounts the middleware function(s) at the path
//  defer all routes matching http://localhost:3000/gallery to module
app.use('/gallery', gallery);
// app.post('/login',function(req, res){
//   res.send('ok');
// });
app.post('/login',
  passport.authenticate('local', { successRedirect : '/',
                                  failureRedirect : '/login'
                                })
);

app.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

app.get('/', ensureAuthenticated, function(req, res) {
  db.Picture.findAll().then(function(pictures) {
    res.render('contact', { pictures : pictures });
  });
});

app.get('/logout', function(req, res) {
  req.logout();
});

app.get('/new_photo', ensureAuthenticated, function(req, res) {
  res.render('newPhoto');
});

function createHash(password) {
  var shasum = crypto.createHash('sha512');
  shasum.update(password);
  var encrypted = shasum.digest('hex');
  return encrypted;
}

var server = app.listen(4321, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});

