(function() {

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    app = express(),
    port = process.env.PORT || 5000,
    nav = [{link: '/books', text: 'Books'}, {link: '/authors', text: 'Authors'}],
    bookRouter = require('./src/routes/bookRoutes')(nav),
    adminRouter = require('./src/routes/adminRoutes')(nav),
    authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library', resave: true, saveUninitialized: true})); // Use an actual secret here
require('./src/config/passport')(app);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port', port);
});

}());