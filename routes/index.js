var repository = require("../repositories/locations-repository.js");

/*
 * GET home page.
 */
exports.index = function(req, res) {

  repository.findAllByVotesDesc(null, function(docs, db) {
    db.close();
    res.render('index', {locations: docs});
  });

};