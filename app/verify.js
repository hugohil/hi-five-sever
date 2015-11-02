var jwt = require('jsonwebtoken');

var server = require('../index.js');
var express = server.express;
var app = server.app;

var verify = module.exports = function verify (req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, app.get('secret'), function (err, decoded){
      if(err){
        console.log(err);
        res.status(403);
        res.json({success: false, reason: err.message});
        return;
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403)
    res.send({success: false, message: 'No token provided.'});
    return;
  }
}
