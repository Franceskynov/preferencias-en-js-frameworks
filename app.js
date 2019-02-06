const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const indexRouter = require('./routes/index');
const votingRouter = require('./routes/voting');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('x-powered-by', 'High tech');
  res.header('Server', 'High tech Server');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, GET, PUT, OPTIONS');
  res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
  
  res.locals.db = db;
  next()
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/voting', votingRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
