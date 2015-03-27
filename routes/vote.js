var locations = require("../repositories/locations-repository.js");

var MAX_VOTES_PER_USER = 3;

// Add +1 to a location
exports.vote = function(req, res) {
  var user = req.session.user;
  if (!user) {
    res.send(401, "User must be logged in to vote for this location");
    return;
  }
  var locationId = req.params.id;
  // Get the votes for a location id 
  locations.findById(locationId, null, function(docs, db) {
    
    if (docs.length < 1) {
      db.close();
      res.send(400, "Location does not exist with id " + locationId);
      return;
    }

    var location = docs[0];

    // A user can't vote more than once for the same location
    if (location.users.indexOf(user) > -1) {
      db.close();
      res.send(400, "Already voted for this location");
      return;
    }

    // There's a limit to how many times a user can vote
    locations.findByUser(user, null, function(docs, db) {
      if (docs.length > MAX_VOTES_PER_USER) {
        db.close();
        res.send(400, "Number of votes exceeded, limit is " + MAX_VOTES_PER_USER);
        return;
      }

      // Finally, +1
      location.votes++;
      location.users.push(user);
      db.close();
      res.send(location);

    });

  });
}
