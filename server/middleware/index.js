module.exports = function(app) {
  const express = require('express');
  const morgan = require('morgan');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const {cookiesCleaner} = require('./auth');
  const session = require('express-session');
  const FileStore = require('session-file-store')(session);
  const mongoose = require('mongoose');
  const bdLink = process.env.BD_LINK;

  mongoose.connect(bdLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const fileStoreOptions = {
    path: path.join(__dirname, '..', 'sessions'),
  };

  app.use(morgan('dev'));

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.use(cookiesCleaner);
  app.use(cookieParser());
  app.use(
    session({
      store: new FileStore(fileStoreOptions),
      key: 'user_sid',
      secret: 'test',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 2.592e+9,
      },
    }),
  );

  app.use((req, res, next) => {
    res.locals = {
      loggedin: !!req.session.user,
      login: req.session.user || '',
    };
    next();
  });
};
