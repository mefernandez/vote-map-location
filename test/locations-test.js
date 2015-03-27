var assert = require("assert");
var locations = require("../routes/locations.js");

describe('A user voting for a location', function() {

  beforeEach(function() {
    // Don't re-assign these or will loose the reference to the actual internal module arrays
    clear(locations.votesByLocation);
    clear(locations.votesByUser);

    function clear(a) {
      while(a.length > 1) {
        a.pop();
      }
      for (var p in a) {
        if (a.hasOwnProperty(p)) {
            delete a[p];
        }
      }
    }
    
  });

  it('should return 1 votes when no one has voted before', function() {

  	var req = {
      params: {
        id: 1
      },
      session: {
        user: 'test'
      }
  	};
  	var res = {
  		send: function(vote) {
  			this.vote = vote;
  		}
  	};
  	locations.vote(req, res);
    assert.equal(1, res.vote.votes);
  });

  it('should return 401 when same user votes twice', function() {
    locations.votesByLocation[1] = {id: 1, votes: 1};
    locations.votesByUser['test'] = {user: 'test', locations: [1]};
    var req = {
      params: {
        id: 1
      },
      session: {
        user: 'test'
      }
    };
    var res = {
      send: function(code, msg) {
        this.code = code;
      }
    };
    locations.vote(req, res);
    assert.equal(401, res.code);
  });

  it('should return 403 if user is not in session', function() {
    locations.votesByLocation[1] = {id: 1, votes: 1};
    locations.votesByUser['test'] = {user: 'test', locations: [1]};
    var req = {
      params: {
        id: 1
      },
      session: {
        user: null
      }
    };
    var res = {
      send: function(code, msg) {
        this.code = code;
      }
    };
    locations.vote(req, res);
    assert.equal(403, res.code);
  });

  it('should return 2 if someone else voted for this location', function() {
    locations.votesByLocation[1] = {id: 1, votes: 1};
    locations.votesByUser['someone'] = {user: 'someone', locations: [1]};
    var req = {
      params: {
        id: 1
      },
      session: {
        user: 'test'
      }
    };
    var res = {
      send: function(vote) {
        this.vote = vote;
      }
    };
    locations.vote(req, res);
    assert.equal(2, res.vote.votes);
  });

});