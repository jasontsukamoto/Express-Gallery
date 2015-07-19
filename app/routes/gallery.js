//create a module for gallery
//  uses modules for logical groupings
//  if there is only one path, don't use a modulei
var express = require('express');
var router = express.Router();
var db = require('../../models');

router.post('/', function(req, res) {
  res.end();
  // db.Picture.findAll({ where : {
  //                       id :
  // }})
});





  // db.Picture.findAll().then(function(pictures) {
  //   console.log(pictures);
  //   res.render('contact.jade', { pictures : pictures });
  // });



router.get('/:id', function(req, res) {
  // var id = req.url.split('').splice(1).join('');
  var id = req.params.id;
  db.Picture.find({ where : {
                        id : id
                      }
  }).then(function(picture) {
    res.render('gallery.jade', { picture : picture });
  });

  // res.send('gallery photo');
});

router.get('/:id/edit', function(req, res) {
  res.send('editing a photo');
});

router.put('/:id', function(req, res) {
  res.send('update photo');
});

router.delete('/:id', function(req, res) {
  res.send('will delete that photo');
});

module.exports = router;