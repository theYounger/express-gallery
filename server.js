const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const CONFIG = require('./config.json');

const User = db.User;

/*==========================
==========JADE SET==========*/
app.set('view engine', 'jade');
app.set('views', './templates');
/*============================*/

app.use(express.static('public'));

/*==========================
===========ROUTES===========*/
const gallery = require('./routes/gallery');
/*==========================*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/gallery', gallery);

/*app.post('/users', function (req, res) {
  User.create({ username: req.body.username} )
    .then(function (user) {
      res.json(user);
    });
});

app.get('/users', (req, res) => {
  User.findAll()
  .then((users) => {
    res.json(users);
  });
});*/

/**========================================
 *=========================================
 * START AUTH STUFF
 *========================================
 *========================================
 */
/*app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));

//Set session before initializing passport
app.use(session({
  secret: CONFIG.SECRET,
  saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  const CREDENTIALS = CONFIG.CREDENTIALS;
  const USERNAME = CREDENTIALS.USERNAME;
  const PASSWORD = CREDENTIALS.PASSWORD;

  const user = {
    name: 'Andy',
    role: 'ADMIN',
    favColor: 'BLUE'
  };

  if(username === USERNAME && password === PASSWORD){
   return done(null, user);
  }
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

//Middleware that will protect SECRET page
const isAuthenticated = (req, res, next) => {
 if(!req.isAuthenticated()) {
  return res.redirect('/login');
 }
 return next();
};

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret', {role: req.user.name});
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/secret',
    failureRedirect: '/login'}));*/

/**========================================
 *=========================================
 * END AUTH STUFF
 *========================================
 *========================================
 */

const server = app.listen(3000, () => {
  db.sequelize.sync();
  console.log('listening on port 3000');
});