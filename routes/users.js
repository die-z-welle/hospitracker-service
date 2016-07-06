var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Persons = mongoose.model('Person');
var BSON = require('bson');

/* GET Persons listing. */
router.get('/', function(req, res, next) {
  Persons.find({}, function(err, docs) {
    if (err) {
      console.err('errors occurred on querying Persons');
    }
    res.send(docs);
  });
});

router.get('/:id', function(req, res) {
   var id = req.params.id;
   Persons.findOne({'_id': new BSON.ObjectID(id)}, function(err, user) {
      res.send(user);
   });
});


router.get('/:id/measurements', function(req, res) {
   var id = req.params.id;
   Persons.findOne({'_id': new BSON.ObjectID(id)})
	 .populate('measurements')
	 .exec(function(err, user) {
      res.send(user.measurements);
   });
});


/* GET Persons listing. */
router.post('/', function(req, res, next) {
  var item = req.body;
  new Persons(item).save();
  res.send(item);
});

module.exports = router;
