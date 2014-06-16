/* ==== MODULES ==== */
var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');

var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* ==== CONFIG ==== */
var db = require('./config/db.js');
var port = process.env.PORT || 8080;

mongoose.connect(db.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() { console.log("Mongo DB connected!"); });

/* ==== STATIC SERVING ==== */
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users

/* ==== AUTHENTICATION ==== */
// set up our express application
app.use(morgan('dev'));                     // log every request to the console
app.use(cookieParser());                    // read cookies (needed for auth)
app.use(bodyParser());                      // get information from html forms

app.use(session({ secret: 'houseApp' }));   // session secret
app.use(passport.initialize());
app.use(passport.session());                // persistent login sessions
app.use(flash());                           // use connect-flash for flash messages stored in session

app.use(methodOverride());                  // simulate DELETE and PUT

// authentication and routes
require('./app/routes/authentication.js')(app, passport); // authentication
require('./app/routes/asanaRoutes.js')(app);
require('./app/routes/mailGun.js')(app);
require('./app/routes/routes.js')(app); // routes

// start app
app.listen(port);
console.log('JobRobber 8] started on port ' + port);
exports = module.exports = app;