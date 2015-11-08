var server = require('../../index.js');
var express = server.express;
var _ = require('lodash');

var db = server.db;

var router = require('../routes');

var Game = require('../models/Game');

var games = module.exports = function (){
  router.route('/game/team/update')
    .put(function (req, res){
      var id = req.body.id;
      var users = req.body.players;
      Game.findById(id, function (err, doc){
        if(err || !doc){
          console.log(err);
          res.status(404);
          res.json(err);
          return;
        }

        console.log(users);
        doc.players = users

        doc.save(function (err){
          if(err){
            res.status(500);
            res.send(err);
            return;
          }
          res.status(200);
          res.json(doc);
        })
      });
    });
}
