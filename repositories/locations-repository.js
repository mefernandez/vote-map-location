var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");

var url = 'mongodb://localhost:27017/vote-map-location';

// If URL for MongoLab is present as an env var, use it.
if (!!process.env.MONGOLAB_URI) {
  url = process.env.MONGOLAB_URI
}

exports.findById = function(id, db, callback) {
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
    var collection = db.collection('locations');
    // Find some documents
    collection.find({id: id}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs, db);
    });
  }
}

exports.findByUser = function(user, db, callback) {
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
    var collection = db.collection('locations');
    // Find some documents
    collection.find({users: { $in: [user] } }).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs, db);
    });
  }
}

exports.findAll = function(db, callback) {
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
    var collection = db.collection('locations');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs, db);
    });
  }
}

exports.save = function(location, db, callback) {
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
    var collection = db.collection('locations');
    // Insert some documents
    collection.insert(location, function(err, result) {
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
    var collection = db.collection('locations');
    // Insert some documents
    collection.remove({ }, function(err, result) {
      assert.equal(err, null);
      callback(result, db);
    });
  }
}

exports.update = function(location, db, callback) {
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
    var collection = db.collection('locations');
    // Update some documents
    collection.update({id: location.id}, location, function(err, result) {
      assert.equal(err, null);
      callback(result, db);
    });
  }
}

exports.findAllByVotesDesc = function(db, callback) {
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
    var collection = db.collection('locations');
    // Find some documents
    collection.find({votes: { $gt: 0 } }).sort({votes: -1}).limit(5).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs, db);
    });
  }

}