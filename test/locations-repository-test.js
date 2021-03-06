var assert    = require("assert");
var locations = require("../repositories/locations-repository");

describe('A Locations Repository', function() {

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

  it('should save one and return one by id', function(done) {
    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      locations.findById(1, db, function(docs, db) {
        assert.equal(1, docs.length);
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
        db.close();
        done();
      });
    });
  });

  it('should save one and return one by user', function(done) {
    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 1, users: ['test'], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      locations.findByUser('test', db, function(docs, db) {
        assert.equal(1, docs.length);
        db.close();
        done();
      });
    });
  });

  it('should save two and return all', function(done) {
    var l1 = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l2 = {id: 2, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save([l1, l2], null, function(result, db) {
      locations.findAll(db, function(docs, db) {
        assert.equal(2, docs.length);
        db.close();
        done();
      });
    });
  });

  it('should save one and and update one adding 1 vote and 1 user', function(done) {
    var l = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save(l, null, function(result, db) {
      l.votes++;
      l.users.push('test');
      locations.update(l, db, function(result, db) {
        locations.findByUser('test', db, function(docs, db) {
          assert.equal(1, docs.length);
          var updated = docs[0];
          assert.equal(1, updated.votes);
          assert.equal('test', updated.users[0]);
          db.close();
          done();
        });
      });
    });
  });

  it('should save three and return all by descending votes order', function(done) {
    var l1 = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 5, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l2 = {id: 2, lat: 39.4821544, lng: -0.3833446, votes: 10, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l3 = {id: 3, lat: 39.4821544, lng: -0.3833446, votes: 2, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save([l1, l2, l3], null, function(result, db) {
      locations.findAllByVotesDesc(db, function(docs, db) {
        assert.equal(3, docs.length);
        assert.equal(10, docs[0].votes);
        assert.equal(5, docs[1].votes);
        assert.equal(2, docs[2].votes);
        db.close();
        done();
      });
    });
  });

  it('should save three with no votes at all and return none', function(done) {
    var l1 = {id: 1, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l2 = {id: 2, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    var l3 = {id: 3, lat: 39.4821544, lng: -0.3833446, votes: 0, users: [], title: 'Oficina con buena pinta', link: 'http://www.idealista.com/inmueble/2207540/', img: 'http://img2.idealista.com/thumbs?wi=850&he=0&en=1TV1Rvu8EF9FDdUxKy%2BhTKXEjTHEvkjC%2B1txKXwH%2BPB2ZiUpK%2BiR29LCAEPsglRvyRHVwaTNHx9Y1um%2BLtyY4DRUT2xZ1lErfbLUUq%2BYReGOOeuOyLJoEPyllGFJY2T3TTDFVQc6cWezvEJYmdQuKMUN53GBzwC2krx5ih6pgRV5qULAvMTcetazodn%2FGRKN&ch=-127169377'};
    locations.save([l1, l2, l3], null, function(result, db) {
      locations.findAllByVotesDesc(db, function(docs, db) {
        assert.equal(0, docs.length);
        db.close();
        done();
      });
    });
  });

});
