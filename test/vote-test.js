var assert    = require("assert");
var locations = require("../repositories/locations-repository");
var vote = require("../routes/vote");

describe('A user voting for a location', function() {

  beforeEach(function(done) {
    locations.deleteAll(null, function(result, db) {
      db.close();
      done();
    });
  });

  after(function(done) {
    locations.deleteAll(null, function(result, db) {
      db.close();
      done();
    });
  });

  it('should return 1 vote when no one has voted before', function(done) {
  	var req = {
      params: {
        id: 1
      },
      user: 'test'
  	};

  	var res = {
  		send: function(vote) {
        assert.equal(1, vote.votes);
        done();
  		}
  	};

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      db.close();
      vote.vote(req, res);
    });
  });

  it('should return 400 when same user votes twice', function(done) {
    var req = {
      params: {
        id: 1
      },
      user: 'test'
    };
    var res = {
      send: function(code, msg) {
        assert.equal(400, code);
        assert.equal("Already voted for this location", msg);
        done();
      }
    };

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: ['test'], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      db.close();
      vote.vote(req, res);
    });
  });

  it('should return 401 if user is not in session', function(done) {
    var req = {
      params: {
        id: 1
      },
      user: null
    };
    var res = {
      send: function(code, msg) {
        assert.equal(401, code);
        assert.equal("User must be logged in to vote for this location", msg);
        done();
      }
    };

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      db.close();
      vote.vote(req, res);
    });
  });

  it('should return 2 votes and 2 users if someone else voted for this location', function(done) {
    var req = {
      params: {
        id: 1
      },
      user: 'test'
    };
    var res = {
      send: function(vote) {
        assert.equal(2, vote.votes);
        assert.equal(2, vote.users.length);
        done();
      }
    };

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 1, users: ['someone else'], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      db.close();
      vote.vote(req, res);
    });
  });

});