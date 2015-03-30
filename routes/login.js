var request     = require('superagent');
var repository  = require('../repositories/users-repository');

exports.authenticate = function(user, pass, fn){
  repository.findByUserAndPass(user, pass, null, function(docs, db) {
    console.log("Found users: " + docs.length);
    if (docs.length < 1) {
      db.close();
      fn(new Error('Invalid User and Pass'), null);
    } else {
      var user = docs[0];
      console.log("Return user: " + JSON.stringify(user));
      db.close();
      fn(null, user);
    }
  });
}

exports.oauth2callback = function(req, res) {
  console.log("oAuth Callback!!!!");
  res.send("Ok");
}

exports.storeprofile = function(req, res) {
  req.session.profile = req.body;
  req.session.user = req.session.profile.id;
  res.send(req.body);
}

exports.storeauthcode = function(req, res) {
  //console.log("req.body: " + req.body.toString());
  var code = req.body.toString();
  var client_id = process.env.GOOGLE_CLIENT_ID;
  var client_secret = process.env.GOOGLE_CLIENT_SECRET;
  var redirect_uri = process.env.GOOGLE_REDIRECT_URI;
  var grant_type = 'authorization_code';

  request
    .post('https://www.googleapis.com/oauth2/v3/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('code=' + code)
    .send('client_id=' + client_id)
    .send('client_secret=' + client_secret)
    .send('redirect_uri=' + redirect_uri)
    .send('grant_type=' + grant_type)
    .end(function(gitHubResp) {
      //var token = gitHubResp.body.access_token;
      //console.log("GitHub Access Token:" + JSON.stringify(gitHubResp));
      res.send(gitHubResp);
      /*
      if (token) {
        request
          .get('https://api.github.com/user')
          .query({
            access_token: token
          })
          .set('User-Agent', 'NinjaCoder.BE')
          .end(function(userInfoResp) {
            req.session.user = userInfoResp.body;
            req.session.token = token;
            res.redirect("/");
          });
      } else {
        /*
        res.writeHead(403, {
          'Content-Type': 'text/plain'
        });
      }
        */
        //res.end("Could not get a valid access_token from GitHub");
    });

  //res.send("Ok");
}