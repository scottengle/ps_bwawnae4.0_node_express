(function() {

var express = require('express'),
    bookRouter = express.Router();

var router = function(nav) {
  var books = [
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
      }];

  bookRouter.route('/')
    .get(function(req, res) {
      res.render('bookList', {
        title: 'Books',
        nav: nav,
        books: books
      });
    });

  bookRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('bookSingle', {
        title: 'Books',
        nav: nav,
        book: books[id]
      });
    });

  return bookRouter;
};

module.exports = router;

}());