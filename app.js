
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var vote = require('./routes/vote');
var location = require('./routes/location');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('keep it safe, keep it secret'));
app.use(express.cookieSession());
//app.use(express.basicAuth('username', 'password'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 
app.use(require('connect-livereload')());

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/oauth2callback', login.oauth2callback);
app.get('/locations', bodyParser.json(), location.list);
app.get('/locations/:id/vote', vote.vote);
app.post('/locations/:id/vote', vote.vote);
app.post('/storeauthcode', bodyParser.raw(), login.storeauthcode);
app.post('/storeprofile', bodyParser.json(), login.storeprofile);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
