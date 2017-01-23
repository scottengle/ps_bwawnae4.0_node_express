(function() {

var express = require('express'),
  mongodb = require('mongodb').MongoClient,
  passport = require('passport'),
  authRouter = express.Router(),
  connectionString = 'mongodb://localhost:27017/libraryApp';

var router = function(nav) {
  authRouter.route('/signup')
    .post(function(req, res) {

      mongodb.connect(connectionString, function(err, db) {
        var collection = db.collection('users'),
            user = {
              username: req.body.username,
              password: req.body.password
            };

        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/auth/profile');
          });
        });
      });
    });

  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/auth/profile');
    });

  authRouter.route('/profile')
    .all(function(req, res, next) {
      if (!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    });

  return authRouter;
};

module.exports = router;

}());