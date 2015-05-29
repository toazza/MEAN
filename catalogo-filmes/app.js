var express = require('express');
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');
var app = express();

//defines the directory of views.
app.set('views', path.join(__dirname, 'views'));
//defines the engine used
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ 
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false, 
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
	extended: true 
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(verifyCredentials));
passport.use(new passportHttp.BasicStrategy(verifyCredentials));

function verifyCredentials(username, password, done) {
	//pretend this is using a real database
	if( username === password) {
		done(null, { id: username, name: username });
	} else {
		done(null, null);
	}
}

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	//Query database or cache here!
	done(null, {id: id, name: id});
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
}

app.get('/', function(req, res) {
	res.render('index', {
		isAuthenticated: req.isAuthenticated(), 
		user: req.user
	});
});

app.get('/catalogo', function(req, res) {
	res.render('catalogo', {
		isAuthenticated: req.isAuthenticated(), 
		user: req.user
	});
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.use('/api', passport.authenticate('basic', { session: false }));

app.get('/api/data', ensureAuthenticated, function(req, res){
	res.json([
		{ value: 'foo'},
		{ value: 'bar'},
		{ value: 'baz'}
		]);
});

app.get('/catalogo', ensureAuthenticated, function(req, res) {
	res.render('catalogo', { user: req.user });
});

app.get('/', routes.index);

app.get('/login', function(req, res) {
	res.render('login');
});
app.post('/', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});
//app.busca('/busca', routes.busca);
app.get('/lista', routes.lista);
app.post('/grava', routes.grava);
app.delete('/filme/:id', routes.deleta);
app.put('/filme', routes.atualiza);
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('http://127.0.0.1:'+ server.address().port + '/');
});