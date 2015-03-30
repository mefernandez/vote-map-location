var assert    = require("assert");
var repository = require("../repositories/users-repository");

describe('A Users Repository', function() {

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

  it('should save one and return one by user and pass', function(done) {
    var u = {user: 'test', pass: 'test'};
    repository.save(u, null, function(result, db) {
      repository.findByUserAndPass('test', 'test', db, function(docs, db) {
        assert.equal(1, docs.length);
        db.close();
        done();
      });
    });
  });


});
