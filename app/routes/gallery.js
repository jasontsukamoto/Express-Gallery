//create a module for gallery
//  uses modules for logical groupings
//  if there is only one path, don't use a modulei
var express = require('express');
var router = express.Router();
var db = require('../../models');
var bodyParser = require('body-parser');

router.post('/', function(req, res) {
  db.Picture.create({
    author : req.body.author,
    link : req.body.link,
    description : req.body.description
  }).then(function(image) {
    // console.log(image);
  });
  res.end();
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  db.Picture.find({ where : {
                        id : id
                      }
  }).then(function(picture) {
    res.render('gallery', { picture : picture });
  });

  // res.send('gallery photo');
});

router.get('/:id/edit', function(req, res) {
  var id = req.params.id;
  db.Picture.findById(id).then(function(picture) {
    res.render('editPhoto', { picture : picture });
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  db.Picture.update({
    author : req.body.author,
    link : req.body.link,
    description : req.body.description
  }, { where : {
          id : id
        }
  }).then(function(image) {
    console.log(image);
    res.send('put complete');
    // res.end();
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  db.Picture.destroy({
    where : {
      id : id
    }
  }).then(function() {
    res.send('will delete that photo');
    res.end();
  });
});

module.exports = router;