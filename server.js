const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./models');

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


const server = app.listen(3000, () => {
  db.sequelize.sync();
  console.log('listening on port 3000');
});