var assert    = require("assert");
var locations = require("../repositories/locations-repository");

describe('A Locations Repository', function() {

  beforeEach(function(done) {
    locations.deleteAll(null, function(result, db) {
      console.log("Connection closed");
      db.close();
      done();
    });
  });

  after(function(done) {
    locations.deleteAll(null, function(result, db) {
      console.log("Connection closed");
      db.close();
      done();
    });
  });

  it('should save one and return one by id', function(done) {
    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      locations.findById(1, db, function(docs, db) {
        assert.equal(1, docs.length);
        console.log("Connection closed");
        db.close();
        done();
      });
    });
  });

  it('should save one and return all', function(done) {
    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      locations.findAll(db, function(docs, db) {
        assert.equal(1, docs.length);
        console.log("Connection closed");
        db.close();
        done();
      });
    });
  });

});
