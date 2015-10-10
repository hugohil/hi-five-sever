/**
 * Basic route definition
 */
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

router.route('/users')
  .get(function (req, res){
    Users.find(function (err, users){
      if(err){
        res.send(err);
      }
      res.json(users);
    });
  });

router.route('/teams')
  .get(function (req, res){
    Teams.find(function (err, teams){
      if(err){
        res.send(err);
      }
      res.json(teams);
    });
  });

router.route('/places')
  .get(function (req, res){
    Places.find(function (err, places){
      if(err){
        res.send(err);
      }
      res.json(places);
    });
  });

router.route('/games')
  .get(function (req, res){
    Games.find(function (err, games){
      if(err){
        res.send(err);
      }
      res.json(games);
    });
  });

router.route('/chats')
  .get(function (req, res){
    Chats.find(function (err, chats){
      if(err){
        res.send(err);
      }
      res.json(chats);
    });
  });