var locations = require("../repositories/locations-repository.js");

exports.list = function(req, res) {
  locations.findAll(null, function(docs, db) {
      db.close();
      res.send(docs);
  });
}

exports.getLocation = function(req, res) {
  var locationId = req.params.id;
  locations.findById(locationId, null, function(docs, db) {
    
    if (docs.length < 1) {
      db.close();
      res.send(404, "Location does not exist with id " + locationId);
      return;
    }

    var location = docs[0];

    db.close();
    res.send(location);
  });
}
