
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var locations = require('./routes/locations');
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
app.get('/locations/:id/vote', locations.vote);
app.post('/locations/:id/vote', locations.vote);
app.get('/locations/:id/votes', locations.votesCount);
app.get('/users', user.list);
app.get('/oauth2callback', login.oauth2callback);
app.post('/storeauthcode', bodyParser.raw(), login.storeauthcode);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
