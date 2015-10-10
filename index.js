'use strict';

var config = require('./app/config');

/**
 * API server setup
 */
var express = module.exports.express = require('express');
var app = module.exports.app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || config.server.port;

/**
 * MongoDB setup
 */

var mongoose = module.exports.db = require('mongoose');
mongoose.connect(config.mongo.url);

/**
 * Setup and prefix routes
 */
app.use('/api', require('./app/routes'));

/**
 * Starting the server
 */
app.listen(port);
console.log('Server running on port %s', port);