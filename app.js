(function() {

var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    nav = [{link: '/books', text: 'Books'}, {link: '/authors', text: 'Authors'}],
    bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use('/books', bookRouter);

app.get('/', function(req, res) {
  res.render('index', {
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port', port);
});

}());