(function() {

var express = require('express'),
    adminRouter = express.Router(),
    mongodb = require('mongodb').MongoClient,
    books = [
      {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
      },
      {
        title: 'Jitterbug Perfume',
        genre: 'Speculative Fiction',
        author: 'Tom Robbins',
        read: false
      },
      {
        title: 'Slaughterhouse Five',
        genre: 'Science Fiction',
        author: 'Kurt Vonnegut Jr.',
        read: false
      },
      {
        title: 'Pride and Prejudice',
        genre: 'Romance Novel',
        author: 'Jane Austen',
        read: false
      }];

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.remove({});
        collection.insertMany(books,
          function(err, results) {
            res.send(results);
            db.close();
          }
        );
      });
    });

  return adminRouter;
};

module.exports = router;

}());