var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Measurements = mongoose.model('Measurement');
var Person = mongoose.model('Person');
var Beacon = mongoose.model('Beacon');

/* GET Measurements listing. */
router.get('/', function(req, res, next) {
  Measurements.find({})
	.populate('person')
	.populate('beacon')
	.exec(function(err, docs) {
    if (err) {
      console.err('errors occurred on querying Measurements');
    }
    res.send(docs);
  });
});

/* GET Measurements listing. */
router.post('/', function(req, res, next) {
  var item = req.body;
	console.log(JSON.stringify(item));

	res.send('');
	/*
	Person.findOne({'deviceId': item.deviceId}, function(err, person) {
		item.measurements.forEach(function(beaconMeasurement) {
			Beacon.findOne({'minor': beaconMeasurement.minor, 'major': beaconMeasurement.major, 'uuid': beaconMeasurement.uuid}, function(err, beacon) {
				var measurement = {
					"time": beaconMeasurement.time,
					"value": beaconMeasurement.value,
					"person": person,
					"beacon": beacon
				};

			  new Measurements(measurement).save();
			  res.send(measurement);
			});

		});
	});
	*/
});

module.exports = router;
