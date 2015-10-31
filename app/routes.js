/**
 * Basic route definition
 */
var path = require('path');
var server = require('../index.js');
var express = server.express;

var db = server.db;

var router = module.exports = express.Router();

router.get('/', function (req, res){
  res.json({message: 'Hi Five Soccer API welcomes you :)'});
});

router.use(function (req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();
});

var routes = [
  {path: 'chat', model: require('./models/Chat')},
  {path: 'game', model: require('./models/Game')},
  {path: 'message', model: require('./models/Message')},
  {path: 'place', model: require('./models/Place')},
  {path: 'team', model: require('./models/Team')},
  {path: 'user', model: require('./models/User')}
];

for (var i = 0; i < routes.length; i++) {
  autoroute(routes[i].path, routes[i].model);
}

function autoroute (path, Model){
  router.route('/' + path)
    .post(function (req, res){
      var doc = new Model(req.body);

      doc.save(function (err){
        if(err){
          console.log('routes.js - POST /%s : %s', path, err);
          res.status(400);
          res.send(err);
        }
        res.status(200);
        res.json({id: doc._id});
      });
    })
    .get(function (req, res){
      Model.find(function (err, docs){
        if(err){
          console.log('routes.js - GET /%s : %s', path, err);
          res.status(400);
          res.send(err);
        }
        res.status(200);
        res.json(docs)
      });
    });

  router.route('/' + path + '/:id')
    .get(function (req, res){
      Model.findById(req.params.id, function (err, doc){
        if(err){
          console.log('routes.js - GET /%s : %s', path, err);
          res.status(400);
          res.send(err);
        }
        res.status(200);
        res.json(doc);
      })
    });
}
