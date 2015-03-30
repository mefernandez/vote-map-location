var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");

var url = 'mongodb://localhost:27017/vote-map-location';

// If URL for MongoLab is present as an env var, use it.
if (!!process.env.MONGOLAB_URI) {
  url = process.env.MONGOLAB_URI
}

exports.findByUserAndPass = function(user, pass, db, callback) {
  if (!db) {
    // New connection
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find({user: user, pass: pass }).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs, db);
    });
  }
}

exports.save = function(user, db, callback) {
  if (!db) {
    // New connection
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
    // Get the documents collection
    var collection = db.collection('users');
    // Insert some documents
    collection.insert(user, function(err, result) {
      assert.equal(err, null);
      callback(result, db);
    });
  }
}

exports.deleteAll = function(db, callback) {
  if (!db) {
    // New connection
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
    // Get the documents collection
    var collection = db.collection('users');
    // Insert some documents
    collection.remove({ }, function(err, result) {
      assert.equal(err, null);
      callback(result, db);
    });
  }
}
