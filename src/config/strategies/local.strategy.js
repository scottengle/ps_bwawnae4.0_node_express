(function() {

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
    connectionString = 'mongodb://localhost:27017/libraryApp';

module.exports = function() {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {

      mongodb.connect(connectionString, function(err, db) {
        var collection = db.collection('users');
        collection.findOne({username: username},
          function(err, results) {
            if (results && results.password === password) {
              var user = results;
              done(null, user);
            } else {
              done(null, false, {message: 'Bad Password'});
            }
          });
      });
    }
  ));
};

}());