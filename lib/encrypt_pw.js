const bcrypt = require('bcrypt');
const db = require('../models');

const User = db.User;

module.exports = (req, res, saltRounds, password) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (hash) => {
      // Store the hash in the Db
      User.create({
        username: req.body.username,
        password: hash,
      }).then(() => {
        res.redirect('/login');
      });
    });
  });
};
