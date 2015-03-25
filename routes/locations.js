var votesByLocation = [];
var votesByUser = [];
var MAX_VOTES_PER_USER = 3;

// Add +1 to a location
exports.vote = function(req, res) {
  // Get the votes for a location id 
  // or create a new vote object and store it if it doesn't exist 
  var user = 'token';
  var locationId = req.params.id;
  var vote = votesByLocation[locationId];
  if (!vote) {
    vote = {id: locationId, votes: 0, users: [user]};
    votesByLocation[locationId] = vote;
  }
  // Check the user did not already vote for this location
  var userVote = votesByUser[user];
  // If the user hasn't voted yet, create a new vote
  if (!userVote) {
    userVote = {user: user, locations: [locationId]};
    votesByUser[user] = userVote;
  }
  if (userVote.locations.length > MAX_VOTES_PER_USER) {
    res.send(401, "Number of votes exceeded");
    return;
  } 
  console.log("!userVote.locations[locationId]: " + !userVote.locations[locationId]);
  if (!userVote.locations[locationId]) {
    vote.votes++;
    userVotes[user].locations.push(locationId);
  }
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