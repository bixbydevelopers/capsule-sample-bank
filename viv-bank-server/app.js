'use strict';
const VERSION = require('./package.json').version;

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const favicon = require('serve-favicon');
const routes = require('./routes');

// Express configuration
const app = express();
app.use(favicon('./favicon.ico'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./auth');

app.get('/', routes.site.index);
app.get('/login', routes.site.loginForm);
app.post('/login', routes.site.login);
app.get('/logout', routes.site.logout);
app.get('/account', routes.site.account);

app.get('/dialog/authorize', routes.oauth2.authorization);
app.post('/dialog/authorize/decision', routes.oauth2.decision);
app.post('/oauth/token', routes.oauth2.token);

app.get('/api/userinfo', routes.user.info);
app.post('/api/commit-transfer', routes.user.commitTransfer);

app.get('/api/clientinfo', routes.client.info);

// Respond with the package version.
// A more in-depth healthcheck would report on the status of any dependencies, such as the health of a DB.
app.get('/healthcheck', function (req, res) {
   const body = {};
   body.version = VERSION;
   res.json(body);
});

// Currently sends the same response as healthcheck.
app.get('/ping', function (req, res) {
	const body = {};
	body.version = VERSION;
	res.json(body);
});



app.listen(process.env.PORT || 8080);
