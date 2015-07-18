//create a module for gallery
//  uses modules for logical groupings
//  if there is only one path, don't use a module
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('you created a new photo!');
});

router.get('/:id', function(req, res) {
  res.send('gallery photo');
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