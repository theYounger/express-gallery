const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const express = require('express');
module.exports = function(req, saltRounds, password) {

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      // Store the hash in the Db
      User.create({
        username: req.body.username,
        password: hash
      });
    });
  });
};
