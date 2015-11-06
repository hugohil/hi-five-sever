/**
 * Basic route definition
 */
var path = require('path');
var server = require('../index.js');
var express = server.express;

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
    });

  router.route('/' + path + '/:id')
    .get(function (req, res){
      Model.findById(req.params.id, function (err, doc){
        if(err){
          res.status(500);
          res.send(err);
          return;
        }
        res.status(200);
        res.json(doc);
      })
    });
}
