(function() {

var express = require('express'),
    bookRouter = express.Router();

var router = function(nav) {
  var bookService = require('../services/goodreadsService')();
  var bookController = require('../controllers/bookController')(bookService, nav);

  bookRouter.use(bookController.middleware);

  bookRouter.route('/')
    .get(bookController.getAll);

  bookRouter.route('/:id')
    .get(bookController.getById);

  return bookRouter;
};

module.exports = router;

}());