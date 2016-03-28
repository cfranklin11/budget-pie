'use strict';

var express, path, favicon, logger, cookieParser, bodyParser, morgan,
  methodOverride, port, app;

express = require('express');
path = require('path');
favicon = require('serve-favicon');
logger = require('morgan');
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
morgan = require( 'morgan' );
methodOverride = require( 'method-override' );

port = process.env.PORT || 8080;
app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes.js')(app);

app.listen( port );
console.log( 'The magic happens on port ' + port );