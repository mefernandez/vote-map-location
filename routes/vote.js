var locations = require("../repositories/locations-repository.js");

var votesByLocation = [
    {id: 1, votes: 0, lat: 39.4821544, lng: -0.3833446, title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'},
    {id: 12, votes: 0, lat: 39.4926944, lng: -0.4007434, title: 'Oficina en Congresos', link: 'http://www.fotocasa.es/oficina/valencia-capital/valencia-ciudad-aire-acondicionado-calefaccion-parking-ascensor-barrio-de-benicalap-134609181?opi=140&tti=3&ppi=3&pagination=1&RowGrid=12&tta=8', img: 'http://images.inmofactory.com/inmofactory/documents/1/83926/7009271/41816599.jpg/w_0/c_690x518/p_1/'}
];
var votesByUser = [];
var MAX_VOTES_PER_USER = 3;

// Export these to setup tests
exports.votesByLocation = votesByLocation;
exports.votesByUser = votesByUser;
exports.MAX_VOTES_PER_USER = MAX_VOTES_PER_USER;


/* Add +1 to a location
 * @return
 * {
 *    id: 1,
 *    votes: 9
 * }
 */
exports.vote = function(req, res) {
  var user = req.session.user;
  if (!user) {
    res.send(403, "User must be logged in to vote for this location");
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
      res.send(location);

    });

  });

};

exports.votesCount = function(req, res){
  var vote = votesByLocation[req.params.id];
  if (!vote) {
    vote = {id: req.params.id, votes: 0};
    votesByLocation[req.params.id] = vote;
  }
  res.send(vote);
};

exports.list = function(req, res) {
  res.send(votesByLocation);
}
