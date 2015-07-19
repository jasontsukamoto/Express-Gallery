//create a module for gallery
//  uses modules for logical groupings
//  if there is only one path, don't use a modulei
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.send('new picture posted!');
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