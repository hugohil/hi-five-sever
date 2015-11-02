var jwt = require('jsonwebtoken');

var server = require('../index.js');
var express = server.express;
var app = server.app;

var User = require('./models/User');

var authenticate = module.exports = function (req, res){
  User.findOne({
    'profile.username': req.body.profile.username
  }, function (err, user){
    if(err){
      console.log(err);
      res.status(500);
      res.json('Sorry, a problem occured on the server.');
      return;
    }
    if(!user){
      return createUser(req, res);
    }
    if(user.profile.password != req.body.profile.password){
      res.status(403);
      res.json({success: false, reason: 'Authentication failed. Wrong password.'});
      return;
    } else {
      var token = jwt.sign(user, app.get('secret'), {expiresIn: app.get('authentication-expiration-date')});
      res.status(200);
      res.json({success: true, token: token});
    }
  });
}

function createUser (req, res){
  var user = new User(req.body);

  if(!user.profile.email || !isValidEmail(user.profile.email)){
    res.status(403);
    res.json({success: false, reason: 'You must provide a valid email address to register'});
    return;
  }

  user.save(function (err){
    if(err){
      res.status(400);
      res.send(err);
      return;
    }
    var token = jwt.sign(user, app.get('secret'), {expiresIn: app.get('authentication-expiration-date')});
    res.status(200);
    res.json({id: user._id, token: token});
  });
}

function isValidEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
