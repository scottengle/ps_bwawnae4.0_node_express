(function() {

var mongodb = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    connectionString = 'mongodb://localhost:27017/libraryApp',
    bookService = require('../services/goodreadsService')();

var bookController = function(bookService, nav) {

  // revealing module pattern

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);
    mongodb.connect(connectionString, function(err, db) {
      var collection = db.collection('books');
      collection.findOne({_id: id},
        function(err, results) {
          bookService.getBookById(results.bookId,
            function(err, book) {
              results.book = book;
              res.render('bookSingle', {
                title: 'Books',
                nav: nav,
                book: results
              });
            });
        }
      );
    });
  };

  var getAll = function(req, res) {
    mongodb.connect(connectionString, function(err, db) {
      var collection = db.collection('books');
      collection.find({}).toArray(
        function(err, results) {
          res.render('bookList', {
            title: 'Books',
            nav: nav,
            books: results
          });
        }
      );
    });
  };

  var middleware = function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  };

  return {
    getById: getById,
    getAll: getAll,
    middleware: middleware
  };
};

module.exports = bookController;

}());
