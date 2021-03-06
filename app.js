var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var mailRouter = require('./routes/mail');
var nodePackage = require('./routes/node-package');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/', indexRouter);
app.use('/api/data', dataRouter);
app.use('/api/mail', mailRouter);
app.use('/api', nodePackage );



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

// mongoose connect localhost
mongoose.connect('mongodb://localhost/pageclip',
// mongoose.connect('mongodb+srv://janaka531:Jayantha@531@cluster0-01qr2.mongodb.net/dataclip?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((sa) => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));



module.exports = app;
