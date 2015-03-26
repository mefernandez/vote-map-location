var request = require('superagent');

exports.oauth2callback = function(req, res) {
  console.log("oAuth Callback!!!!");
  res.send("Ok");
}

exports.storeauthcode = function(req, res) {
  //console.log("req.body: " + req.body.toString());
  var code = req.body.toString();
  var client_id = '748960406594-l0rgulrbco42rn6j0g7ssr887dop65pr.apps.googleusercontent.com';
  var client_secret = 'bjdIuGvew6NRaQXhgtJf7v49';
  var redirect_uri = 'http://localhost:3000/oauth2callback';
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