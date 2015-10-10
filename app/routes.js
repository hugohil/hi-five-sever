/**
 * Basic route definition
 */
var path = require('path');
var server = require('../index.js');
var express = server.express;

var db = server.db;
var Users = require('./models/Users');
var Teams = require('./models/Teams');
var Places = require('./models/Places');
var Games = require('./models/Games');
var Chats = require('./models/Chats');

var router = module.exports = express.Router();

router.get('/', function (req, res){
  res.json({message: 'Hi Five Soccer API welcomes you :)'});
});

router.use(function (req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();
});

var stubsPath = path.resolve(__dirname + '/../stubs');
router.use(express.static(stubsPath));

router.route('/users')
  .get(function (req, res){
    res.sendFile(stubsPath + '/Users.json', {}, function (err){
      if(err){
        console.log(err);
        res.status(err.status).end();
      }
    });
  });

router.route('/teams')
  .get(function (req, res){
    res.sendFile(stubsPath + '/Teams.json', {}, function (err){
      if(err){
        console.log(err);
        res.status(err.status).end();
      }
    });
  });

router.route('/places')
  .get(function (req, res){
    res.sendFile(stubsPath + '/Places.json', {}, function (err){
      if(err){
        console.log(err);
        res.status(err.status).end();
      }
    });
  });

router.route('/games')
  .get(function (req, res){
    res.sendFile(stubsPath + '/Games.json', {}, function (err){
      if(err){
        console.log(err);
        res.status(err.status).end();
      }
    });
  });

router.route('/chats')
  .get(function (req, res){
    res.sendFile(stubsPath + '/Chats.json', {}, function (err){
      if(err){
        console.log(err);
        res.status(err.status).end();
      }
    });
  });