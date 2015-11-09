var server = require('../../index.js');
var express = server.express;
var _ = require('lodash');

var db = server.db;

var router = require('../routes');

var User = require('../models/User');

var games = module.exports = function (){
  router.route('/user/add/pending')
    .put(function (req, res){
      var id = req.body.user;
      var game = req.body.game;
      User.findById(id, function (err, doc){
        if(err || !doc){
          res.status(404);
          res.json(err);
          return;
        }

        console.log("DEBUG ",game, doc.pending);

        if(doc.pending.indexOf(game) < 0){
          doc.pending.push(game);
          doc.markModified('pending');
        }

        doc.save(function (err){
          if(err){
            res.status(500);
            res.send(err);
            return;
          }
          res.status(200);
          res.json(doc);
        });
      });
    });

    router.route('/user/add/game')
      .put(function (req, res){
        var id = req.body.user;
        var game = req.body.game;
        User.findById(id, function (err, doc){
          if(err || !doc){
            res.status(404);
            res.json(err);
            return;
          }

          if(doc.games.indexOf(game) < 0){
            doc.games.push(game);
            doc.markModified('games');
          }
          if(doc.pending.indexOf(game) > -1){
            if(doc.pending.length > 1){
              doc.pending.slice(doc.pending.indexOf(game), doc.pending.indexOf(game) + 1);
            } else {
              doc.pending = new Array();
            }
            doc.markModified('pending');
          }

          doc.save(function (err){
            if(err){
              res.status(500);
              res.send(err);
              return;
            }
            res.status(200);
            res.json(doc);
          });
        });
      });

      router.route('/user/quit/game')
        .put(function (req, res){
          var id = req.body.user;
          var game = req.body.game;
          User.findById(id, function (err, doc){
            if(err || !doc){
              console.log(err);
              res.status(404);
              res.json(err);
              return;
            }

            if(doc.games.indexOf(game) > -1){
              if(doc.games.length > 1){
                doc.games.slice(doc.games.indexOf(game), doc.games.indexOf(game) + 1);
              } else {
                doc.games = new Array();
              }
              doc.markModified('games');
            }

            if(doc.pending.indexOf(game) > -1){
              if(doc.pending.length > 1){
                doc.pending.slice(doc.pending.indexOf(game), doc.pending.indexOf(game) + 1);
              } else {
                doc.pending = new Array();
              }
              doc.markModified('pending');
            }

            doc.save(function (err){
              if(err){
                res.status(500);
                res.send(err);
                return;
              }
              res.status(200);
              res.json(doc);
            });
          });
        });
};
