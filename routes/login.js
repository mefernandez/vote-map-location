var request = require('superagent');

exports.oauth2callback = function(req, res) {
  var input = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code
    };

    console.log("POST: https://github.com/login/oauth/access_token")

    request
      .post('https://github.com/login/oauth/access_token')
      .send(input)
      .set('Accept', 'application/json')
      .set('User-Agent', process.env.GITHUB_APPLICATION_NAME)
      .end(function(gitHubResp) {
        console.log("GitHub Response:");
        console.log(JSON.stringify(gitHubResp));
        var token = gitHubResp.body.access_token;
        if (token) {
          console.log("GET: https://api.github.com/user")
          request
            .get('https://api.github.com/user')
            .query({
              access_token: token
            })
            .set('User-Agent', process.env.GITHUB_APPLICATION_NAME)
            .end(function(userInfoResp) {
              console.log("GitHub Response:");
              console.log(JSON.stringify(userInfoResp));
              req.session.user = userInfoResp.body;
              req.session.token = token;
              res.redirect("/");
            });
        } else {
          res.send(403, gitHubResp.body);
        }
      });
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