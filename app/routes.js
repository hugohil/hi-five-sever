/**
 * Basic route definition
 */
var path = require('path');
var server = require('../index.js');
var express = server.express;
var _ = require('lodash');

var db = server.db;

var router = module.exports = express.Router();

router.route('/authenticate').post(require('./authenticate'));

router.use(require('./verify'));

router.get('/', function (req, res){
  res.json({message: 'Hi Five Soccer API welcomes you :)'});
});

var routes = [
  {path: 'game', model: require('./models/Game')},
  {path: 'user', model: require('./models/User')}
];

for (var i = 0; i < routes.length; i++) {
  autoroute(routes[i].path, routes[i].model);
}

require('./routes/games')();
require('./routes/users')();

function autoroute (path, Model){
  router.route('/' + path)
    .post(function (req, res){
      if(path == 'user'){
        res.status(403);
        res.send('User registration is done on the /api/authenticate route');
        return;
      }
      var doc = new Model(req.body);

      doc.save(function (err){
        if(err){
          res.status(400);
          res.send(err);
          return;
        }
        res.status(200);
        res.json({id: doc._id});
      });
    })
    .get(function (req, res){
      Model.find(function (err, docs){
        if(err){
          res.status(500);
          res.send(err);
          return;
        }
        res.status(200);
        res.json(docs)
      });
    })
    .put(function (req, res){
      if(path == 'game'){
        res.status(403);
        res.send('Game update is done via /game/team/update or /game/team/delete');
        return;
      }
      Model.findById(req.body._id, function (err, doc){
        if(err || doc == null){
          res.status(500);
          res.send(err);
          return;
        }
        delete req.body._id;
        _.merge(doc, req.body);
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

  router.route('/' + path + '/:id')
    .get(function (req, res){
      var id = req.params.id;
      var re = /\[(.+)\]/gi;
      var handler = function handler (err, doc){
        if(err){
          res.status(500);
          res.send(err);
          return;
        }
        res.status(200);
        res.json(doc);
      }

      if(id.match(re)){
        var ids = id.replace(/(\[|\])|(\"|\')|(\s|,([^,])$)/g, '').split(',');
        Model.find({'_id': {$in: ids}}, handler);
      } else {
        Model.findById(id, handler);
      }
    })
    .delete(function (req, res){
      var id = req.params.id;

      Model.findById(id, function (err, doc){
        if(err || !doc){
          res.status(404);
          res.send(err);
          return;
        }
        doc.remove(function (err){
          res.status(200);
          res.json({success: true, message: "Document successfully removed"});
        });
      });
    });
}
