var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");

var url = 'mongodb://localhost:27017/vote-map-locations';

exports.findById = function(id, db, callback) {
  if (!db) {
    // New connection
    console.log("Connecting to server");
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
      // Get the documents collection
    var collection = db.collection('locations');
    // Find some documents
    collection.find({id: id}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs)
      callback(docs, db);
    });
  }
}

exports.findAll = function(db, callback) {
  if (!db) {
    // New connection
    console.log("Connecting to server");
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
      // Get the documents collection
    var collection = db.collection('locations');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.dir(docs)
      callback(docs, db);
    });
  }
}

exports.save = function(location, db, callback) {
  if (!db) {
    // New connection
    console.log("Connecting to server");
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
      // Get the documents collection
    var collection = db.collection('locations');
    // Insert some documents
    collection.insert(location, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted 1 documents into the locations collection");
      callback(result, db);
    });
  }
}

exports.deleteAll = function(db, callback) {
  if (!db) {
    // New connection
    console.log("Connecting to server");
    MongoClient.connect(url, dbOperation);
  } else {
    // Reuse connection
    dbOperation(null, db);
  }

  function dbOperation(err, db) {
    assert.equal(null, err);
      // Get the documents collection
    var collection = db.collection('locations');
    // Insert some documents
    collection.remove({ }, function(err, result) {
      assert.equal(err, null);
      console.log("Removed all documents");
      callback(result, db);
    });
  }
}