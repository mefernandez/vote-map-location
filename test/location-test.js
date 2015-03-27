var assert      = require("assert");
var repository  = require("../repositories/locations-repository");
var location    = require("../routes/location");

describe('Location API', function() {

  beforeEach(function(done) {
    repository.deleteAll(null, function(result, db) {
      db.close();
      done();
    });
  });

  after(function(done) {
    repository.deleteAll(null, function(result, db) {
      db.close();
      done();
    });
  });

  it('should return a location for an existing id', function(done) {
  	var req = {
      params: {
        id: 1
      },
      session: {
        user: 'test'
      }
  	};

  	var res = {
  		send: function(location) {
        assert.equal(1, location.id);
        assert.equal('Oficina con buena pinta', location.title);
        done();
  		}
  	};

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    repository.save(l, null, function(result, db) {
      db.close();
      location.getLocation(req, res);
    });
  });

 it('should return 404 for a non-existing existing location id', function(done) {
    var req = {
      params: {
        id: 2
      },
      session: {
        user: 'test'
      }
    };

    var res = {
      send: function(code, msg) {
        assert.equal(404, code);
        assert.equal('Location does not exist with id 2', msg);
        done();
      }
    };

    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    repository.save(l, null, function(result, db) {
      db.close();
      location.getLocation(req, res);
    });
  });

  it('should return all locations', function(done) {
    var req = {
      params: {
        id: 1
      },
      session: {
        user: 'test'
      }
    };

    var res = {
      send: function(locations) {
        assert.equal(2, locations.length);
        done();
      }
    };

    var l1 = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l2 = {id: 2, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    repository.save([l1, l2], null, function(result, db) {
      db.close();
      location.list(req, res);
    });
  });
});