'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const db = require('./models');
const gallery = require('./routes/gallery');
const analyticTrack = require('./lib/analytics_track');
const bcrypt = require('bcrypt');
const encrypt = require('./lib/encrypt_pw');
const flash = require('connect-flash');
const User = db.User;
var config;

if ( process.env.NODE_ENV ) {
  config = {
    'secret': process.env.SECRET
  };
} else {
  config = require('./config/config.json');
}

/*==========================
==========JADE SET==========*/
app.set('view engine', 'jade');
app.set('views', './templates');
/*============================*/

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*=============================================
=        CONFIG EXAMPLE RETOOLING             =
=============================================*/

app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(analyticTrack);
app.use('/gallery', gallery);


passport.use(new LocalStrategy(
  (username,password,done) => {
    User.findOne({ where: { username: username }

    }).then ((data) => {
      var passHash;
      bcrypt.compare(password, data.dataValues.password, (err, res) => {

        passHash = res;

        if(data.dataValues.username !== username) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if(!passHash) {
          return done(null, false, { message: 'Incorrect password.'});
        }
        return done(null, data);
      });
    });
  }
));

//assign an id/cookie to browser for use after initial authentication
passport.serializeUser((user, done) => {
  return done(null, user);
});
//remove the id/cookie from browser
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//midware
const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
};

app.get('/register', (req, res) => {
  res.render('./authTemplates/register');
});

app.post('/register', (req, res) => {
  encrypt(req, res, 10, req.body.password);
});

app.get('/login', (req, res) => {
  res.render('authTemplates/login', { messages: req.flash('error')[0] });
});

//redirect upon authentication
app.post('/login', passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.get('/logout', (req, res)=> {
  req.logout(); //clears cookies
  res.redirect('/login');
});

/*=====  End of Section comment block  ======*/

const server = app.listen(3000, () => {
  db.sequelize.sync();
  console.log('listening on port 3000');
});

module.exports = isAuthenticated;
