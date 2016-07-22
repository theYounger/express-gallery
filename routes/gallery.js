const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');

const db = require('../models');

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.route('/')
  .get( ( req, res ) => {
    res.send('hi world');
  })
  .get( '/:id', (req, res) => {
    res.send('hi world 2');
  })
  .get( '/new', ( req, res ) => {

  })
  .post( ( req, res ) => {

  })
  .get( '/:id/edit', ( req, res ) => {

  })
  .put( '/:id', ( req, res ) => {

  })
  .delete ( '/:id', ( req, res ) => {

  });

module.exports = Router;