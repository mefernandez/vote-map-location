var votesByLocation = [];
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
  // or create a new vote object and store it if it doesn't exist 
  var vote = votesByLocation[locationId];
  console.log("vote: " + JSON.stringify(vote));
  if (!vote) {
    vote = {id: locationId, votes: 0, users: [user]};
    votesByLocation[locationId] = vote;
  }
  // Check the user did not already vote for this location
  var userVote = votesByUser[user];
  console.log("userVote: " + JSON.stringify(userVote));
  // If the user hasn't voted yet, create a new vote
  if (!userVote) {
    userVote = {user: user, locations: []};
    votesByUser[user] = userVote;
  } else if (userVote.locations.indexOf(locationId) > -1) {
    // A user can't vote more than once for the same location
    res.send(401, "Already voted for this location");
    return;
  }
  // There's a limit to how many times a user can vote
  if (userVote.locations.length > MAX_VOTES_PER_USER) {
    res.send(401, "Number of votes exceeded");
    return;
  }
  // Finally, +1
  vote.votes++;
  userVote.locations.push(locationId);
  res.send(vote);
};

exports.votesCount = function(req, res){
  var vote = votesByLocation[req.params.id];
  if (!vote) {
    vote = {id: req.params.id, votes: 0};
    votesByLocation[req.params.id] = vote;
  }
  res.send(vote);
};