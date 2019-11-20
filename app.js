var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var logger = require('morgan');
require('./app_server/models/db');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');

var app = express();
app.set('trust proxy', 1) // trust first proxy

app.use(session({
  store: new SQLiteStore({
    table: 'sessions',
    db: 'sessionsDB.db',
    dir: '.',
  }),
  secret: 'your secret',
  cookie: { 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: false },
  resave: true,
  saveUninitialized: false,
}));

// make user ID and username available in templates
app.use(function (req, res, next) {
  res.locals.userName = req.session.userName;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
