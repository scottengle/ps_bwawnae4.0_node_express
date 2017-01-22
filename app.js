(function() {

var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;//,
    //handlebars = require('express-handlebars');

app.use(express.static('public'));
app.set('views', 'src/views');

//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', 'jade');
//app.set('view engine', '.hbs');
app.set('view engine', 'ejs');

app.get('/books', function(req, res) {
  res.send('books');
});

app.get('/', function(req, res) {
  res.render('index', {title: 'Hello from Render!', list: ['a', 'b']});
});

app.listen(port, function(err) {
  console.log('running server on port', port);
});
}());